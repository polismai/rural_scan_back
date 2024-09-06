import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { CompaniesModule } from './companies/companies.module';
import { ConfigModule } from '@nestjs/config';
import { FieldsModule } from './fields/fields.module';
import { PotrerosModule } from './potreros/potreros.module';
import { AnimalsModule } from './animals/animals.module';
import { UserActivityModule } from './user-activity/user-activity.module';
import { AnimalPotreroModule } from './animal-potrero/animal-potrero.module';
import { DataSourceConfig } from './config/data.source';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      // load: [typeOrmConfig],
    }),
    TypeOrmModule.forRoot({ ...DataSourceConfig }),
    // TypeOrmModule.forRootAsync({
    //   inject: [ConfigService],
    //   useFactory: async (configService: ConfigService) =>
    //     configService.get('typeorm'),
    // }),
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
