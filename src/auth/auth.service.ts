import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import * as bcryptjs from 'bcryptjs';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async login({ username, password }: LoginDto) {
    const user = await this.usersService.findByUsernameWithPassword(username);

    if (!user) {
      throw new UnauthorizedException('username is wrong');
    }

    const isPasswordValid = await bcryptjs.compare(password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('password is wrong');
    }

    const { id, role } = user;

    const payload = { id, username: user.username, role }; // puedo enviar tmb el id pero como en este caso el username es unico, no es necesario

    const token = await this.jwtService.signAsync(payload);

    return {
      token,
      username,
    };
  }

  async profile({ username }: { username: string }) {
    return await this.usersService.findOneByUsername(username);
  }
}
