import { UserActivityService } from './../user-activity/user-activity.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as bcryptjs from 'bcryptjs';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { UserActiveInterface } from '../common/interfaces/user-active.interface';
import { ConfigService } from '@nestjs/config';
import { UserRole } from '../common/enums/role.enum';
import { PayloadToken } from './interfaces/auth.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly userActivityService: UserActivityService,
    private readonly configService: ConfigService,
  ) {}

  async login({ username, password, rememberMe }: LoginDto) {
    if (
      username === this.configService.get<string>('SUPERADMIN_USERNAME') &&
      password === this.configService.get<string>('SUPERADMIN_PASSWORD')
    ) {
      const payload = { role: UserRole.SUPERADMIN };
      const token = await this.jwtService.signAsync(payload, {});
      return { token };
    }

    const user = await this.usersService.findByUsernameWithPassword(username);

    if (!user) {
      throw new UnauthorizedException('datos incorrectos');
    }

    const isPasswordValid = await bcryptjs.compare(password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('datos incorrectos');
    }

    const { id, role, fieldId } = user;

    const tokenOptions = rememberMe ? {} : { expiresIn: '30d' };

    const payload: PayloadToken = {
      sub: id,
      id,
      username: user.username,
      role,
      fieldId,
    };

    const token = await this.jwtService.signAsync(payload, tokenOptions);

    await this.userActivityService.logActivity(id, 'login');

    return {
      token,
      username,
    };
  }

  async logout(user: UserActiveInterface) {
    await this.userActivityService.logActivity(user.id, 'logout');
    return { message: 'Logout successful' };
  }

  async profile({ username }: { username: string }) {
    return await this.usersService.findOneByUsername(username);
  }
}
