import {
  CanActivate,
  ExecutionContext,
  Injectable,
  HttpException, HttpStatus
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { ConfigService } from '@nestjs/config';
import { Reflector } from '@nestjs/core';
import { PUBLIC_KEY } from '../constants/key-decorators';

export class CustomUnauthorizedException extends HttpException {
  constructor() {
    super('Acceso no autorizado', HttpStatus.FORBIDDEN);
  }
}

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.get<boolean>(
      PUBLIC_KEY,
      context.getHandler(),
    );

    if (isPublic) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    if (!token) {
      // throw new UnauthorizedException('Bearer token not found');
      throw new CustomUnauthorizedException();
    }

    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: this.configService.get<string>('JWT_SECRET'),
      });
      // payload.iat = new Date(payload.iat * 1000);
      // payload.exp = new Date(payload.exp * 1000);
      request.user = payload;
    } catch (error) {
      // throw new UnauthorizedException('invalid token');
      throw new CustomUnauthorizedException();
    }
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
