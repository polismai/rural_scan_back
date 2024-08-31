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

  async create({
    name,
    location,
    owner,
    companyId,
  }: CreateFieldDto): Promise<Field> {
    try {
      const fieldFound = await this.fieldRepository.findOneBy({ name });
      if (fieldFound) {
        throw new ErrorManager({
          type: 'CONFLICT',
          message: 'field already exists',
        });
      }

      return await this.fieldRepository.save({
        name,
        location,
        owner,
        companyId,
      });
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  async findAll(): Promise<Field[]> {
    try {
      const fields = await this.fieldRepository.find({
        relations: ['company'],
      });
      if (fields.length === 0) {
        throw new ErrorManager({
          type: 'NOT_FOUND',
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
