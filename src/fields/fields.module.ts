import { Module } from '@nestjs/common';
import { FieldsService } from './fields.service';
import { FieldsController } from './fields.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Field } from './entities/field.entity';
import { AuthModule } from 'src/auth/auth.module';
import { CompaniesModule } from 'src/companies/companies.module';

@Module({
  imports: [TypeOrmModule.forFeature([Field]), AuthModule, CompaniesModule],
  controllers: [FieldsController],
  providers: [FieldsService],
})
export class FieldsModule {}
