import { Injectable } from '@nestjs/common';
import { CreateFieldDto } from './dto/create-field.dto';
// import { UpdateFieldDto } from './dto/update-field.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Field } from './entities/field.entity';
import { Repository } from 'typeorm';
import { ErrorManager } from 'src/utils/error.manager';
import { Company } from 'src/companies/entities/company.entity';

@Injectable()
export class FieldsService {
  constructor(
    @InjectRepository(Field)
    private readonly fieldRepository: Repository<Field>,

    @InjectRepository(Company)
    private readonly companyRepository: Repository<Company>,
  ) {}

  async create({ name, company }: CreateFieldDto) {
    try {
      const fieldFound: Field = await this.fieldRepository.findOneBy({ name });
      if (fieldFound) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'field already exists',
        });
      }
      const companyFound = await this.companyRepository.findOneBy({
        id: company,
      });
      if (!companyFound) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'company not found',
        });
      }
      return await this.fieldRepository.save({ name, company: companyFound });
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  async findAll() {
    try {
      const fields: Field[] = await this.fieldRepository.find();
      if (fields.length === 0) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'fields not found',
        });
      }
      return fields;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  // findOne(id: number) {
  //   return `This action returns a #${id} field`;
  // }

  // update(id: number, updateFieldDto: UpdateFieldDto) {
  //   return `This action updates a #${id} field`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} field`;
  // }
}
