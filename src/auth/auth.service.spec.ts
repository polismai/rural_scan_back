import { Test } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { UsersService } from '../users/users.service';
import { UserActivityService } from '../user-activity/user-activity.service';
import { UnauthorizedException } from '@nestjs/common';
import * as bcryptjs from 'bcryptjs';
import { UserRole } from '../common/enums/role.enum';

describe('authService', () => {
  let authService: AuthService;
  let usersService: UsersService;
  let userActivityService: UserActivityService;

  beforeAll(async () => {
    const mockUsersService: Partial<UsersService> = {
      findByUsernameWithPassword: jest.fn(),
      findOneByUsername: jest.fn(),
    };

    const mockUserActivityService: Partial<UserActivityService> = {
      logActivity: jest.fn().mockResolvedValue({
        id: 'fa1b97ee-e242-4df2-97f7-2b349a85bf2a',
        activity: 'login',
      }),
    };

    const module = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: JwtService,
          useValue: {
            signAsync: jest.fn().mockResolvedValue('mockedToken'),
          },
        },
        {
          provide: ConfigService,
          useValue: {
            get: jest.fn((key: string) => {
              if (key === 'SUPERADMIN_USERNAME') return 'super_usuario';
              if (key === 'SUPERADMIN_PASSWORD') return 'super_password';
              return null;
            }),
          },
        },
        {
          provide: UsersService,
          useValue: mockUsersService,
        },
        {
          provide: UserActivityService,
          useValue: mockUserActivityService,
        },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    usersService = module.get<UsersService>(UsersService);
    userActivityService = module.get<UserActivityService>(UserActivityService);
  });

  it('Create an instance of AuthService', async () => {
    expect(authService).toBeDefined();
  });

  it('Login como superadmin', async () => {
    const result = await authService.login({
      username: 'super_usuario',
      password: 'super_password',
    });
    expect(result.token).toBe('mockedToken');
  });

  it('Login de usuario con datos incorrectos', async () => {
    await expect(
      authService.login({
        username: 'usuario_con_error',
        password: 'b',
        rememberMe: true,
      }),
    ).rejects.toThrow(new UnauthorizedException('datos incorrectos'));
  });

  it('Login de usuario con datos correctos', async () => {
    const mockUser = {
      id: '3139ae8b-ee8d-4715-bf4b-77cc128bd99f',
      username: 'usuario_correcto',
      password: await bcryptjs.hash('user-password', 10),
      role: UserRole.ADMIN,
      fieldId: 'fa1b97ee-e242-4df2-97f7-2b349a85bf2a',
      active: true,
      createdAt: new Date(),
      updatedAt: new Date(),
      field: {} as any,
    };

    jest
      .spyOn(usersService, 'findByUsernameWithPassword')
      .mockResolvedValue(mockUser);
    jest.spyOn(bcryptjs, 'compare').mockResolvedValue(true);

    const result = await authService.login({
      username: 'usuario_correcto',
      password: 'user-password',
      rememberMe: true,
    });

    expect(result.token).toBe('mockedToken');
    expect(result.username).toBe('usuario_correcto');
    expect(userActivityService.logActivity).toHaveBeenCalledWith(
      mockUser.id,
      'login',
    );
  });

  it('Debe realizar correctamente el logout y registrar la actividad', async () => {
    const mockUser = {
      id: '3139ae8b-ee8d-4715-bf4b-77cc128bd99f',
      username: 'usuario_correcto',
      role: UserRole.ADMIN,
      fieldId: 'fa1b97ee-e242-4df2-97f7-2b349a85bf2a',
    };

    const response = await authService.logout(mockUser);

    expect(userActivityService.logActivity).toHaveBeenCalledWith(
      mockUser.id,
      'logout',
    );
    expect(response).toEqual({ message: 'Logout successful' });
  });

  it('Debe devolver el perfil del usuario activo', async () => {
    const mockUser = {
      id: '3139ae8b-ee8d-4715-bf4b-77cc128bd99f',
      username: 'usuario_correcto',
      password: await bcryptjs.hash('user-password', 10),
      role: UserRole.ADMIN,
      fieldId: 'fa1b97ee-e242-4df2-97f7-2b349a85bf2a',
      active: true,
      createdAt: new Date(),
      updatedAt: new Date(),
      field: {} as any,
    };

    jest.spyOn(usersService, 'findOneByUsername').mockResolvedValue(mockUser);

    const profileResponse = await authService.profile(mockUser);

    expect(profileResponse).toEqual(mockUser);
  });
});
