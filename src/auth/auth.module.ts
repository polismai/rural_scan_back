import { Global, Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { UserActivityModule } from '../user-activity/user-activity.module';
import { ConfigService } from '@nestjs/config';
import { UsersService } from '../users/users.service';
import { UsersModule } from 'src/users/users.module';

@Global()
@Module({
  imports: [
    UserActivityModule,
    UsersModule,
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        global: true,
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: {},
      }),
    }),
    // JwtModule.registerAsync({
    //   useFactory: async () => {
    //     const configService = new ConfigService();
    //     return {
    //       global: true,
    //       secret: configService.get<string>('JWT_SECRET'),
    //       signOptions: {},
    //     };
    //   },
    // }),
  ],
  controllers: [AuthController],
  providers: [AuthService, UsersService],
  exports: [AuthService],
})
export class AuthModule {}
