import { Module } from '@nestjs/common';
import { FieldsService } from './fields.service';
import { FieldsController } from './fields.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Field } from './entities/field.entity';
import { CompaniesModule } from 'src/companies/companies.module';
import { PotrerosModule } from 'src/potreros/potreros.module';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [TypeOrmModule.forFeature([Field]), CompaniesModule, PotrerosModule],
  controllers: [FieldsController],
  providers: [FieldsService, JwtService],
})
export class FieldsModule {}
