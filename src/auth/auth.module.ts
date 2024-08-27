import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { UserActivityModule } from 'src/user-activity/user-activity.module';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    UsersModule,
    UserActivityModule,
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
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
