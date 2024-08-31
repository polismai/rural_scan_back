import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { CompaniesModule } from './companies/companies.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { FieldsModule } from './fields/fields.module';
import { PotrerosModule } from './potreros/potreros.module';
import { AnimalsModule } from './animals/animals.module';
import { UserActivityModule } from './user-activity/user-activity.module';
import { AnimalPotreroModule } from './animal-potrero/animal-potrero.module';
import typeOrmConfig from './config/typeorm';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [typeOrmConfig],
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) =>
        configService.get('typeorm'),
      //   type: 'postgres',
      //   host: configService.get<string>('DATABASE_HOST'),
      //   port: configService.get<number>('DATABASE_PORT'),
      //   username: configService.get<string>('DATABASE_USER'),
      //   password: configService.get<string>('DATABASE_PASSWORD'),
      //   database: configService.get<string>('DATABASE_NAME'),
      //   ssl:
      //     configService.get<string>('ENVIRONMENT') === 'development'
      //       ? false
      //       : {
      //           rejectUnauthorized: false,
      //         },
      //   synchronize: true,
      //   logging: false,
      //   autoLoadEntities: true,
      //   retryDelay: 3000,
      //   retryAttempts: 10,
    }),
    UsersModule,
    AuthModule,
    CompaniesModule,
    FieldsModule,
    PotrerosModule,
    AnimalsModule,
    UserActivityModule,
    AnimalPotreroModule,
  ],
  controllers: [],
  providers: [],
  exports: [],
})
export class AppModule {}
