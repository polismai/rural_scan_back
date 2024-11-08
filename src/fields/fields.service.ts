import { Injectable } from '@nestjs/common';
import { CreateFieldDto } from './dto/create-field.dto';
// import { UpdateFieldDto } from './dto/update-field.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Field } from './entities/field.entity';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { ErrorManager } from 'src/utils/error.manager';
import { Company } from 'src/companies/entities/company.entity';
import { UpdateFieldDto } from './dto/update-field.dto';

@Injectable()
export class FieldsService {
  constructor(
    @InjectRepository(Field)
    private readonly fieldRepository: Repository<Field>,

    @InjectRepository(Company)
    private readonly companyRepository: Repository<Company>,
  ) {}

  async createField({
    name,
    location,
    country,
    owner,
    companyId,
  }: CreateFieldDto): Promise<Field> {
    try {
      const fieldFound: Field = await this.fieldRepository.findOneBy({ 
        name,
        isActive: true 
      });
      
      if (fieldFound) {
        throw new ErrorManager({
          type: 'CONFLICT',
          message: 'field already exists',
        });
      }

      return await this.fieldRepository.save({
        name,
        location,
        country,
        owner,
        companyId,
      });
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  // async getFields(): Promise<Field[]> {
  //   try {
  //     const fields: Field[] = await this.fieldRepository.find({
  //       relations: ['company'],
  //     });
  //     if (fields.length === 0) {
  //       throw new ErrorManager({
  //         type: 'NOT_FOUND',
  //         message: 'fields not found',
  //       });
  //     }
  //     return fields;
  //   } catch (error) {
  //     throw ErrorManager.createSignatureError(error.message);
  //   }
  // }

  async getFieldsByCompany(companyId: string): Promise<Field[]> {
    try {
      const fields: Field[] = await this.fieldRepository.find({
        where: {
          company: { id: companyId },
          isActive: true,
        },
        relations: ['company'],
      });

      if (fields.length === 0) {
        throw new ErrorManager({
          type: 'NOT_FOUND',
          message: 'Fields not found for this company',
        });
      }

      return fields;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  async getFieldById(id: string): Promise<Field> {
    try {
      const field: Field = await this.fieldRepository.findOne({
        where: { id },
        relations: ['company'],
      });
      if (!field) {
        throw new ErrorManager({
          type: 'NOT_FOUND',
          message: 'field not found',
        });
      }
      return field;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  async updateField(
    id: string,
    updateFieldDto: UpdateFieldDto,
  ): Promise<UpdateResult> {
    try {
      const field: UpdateResult = await this.fieldRepository.update(
        id,
        updateFieldDto,
      );
      if (field.affected === 0) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'el campo no se pudo actualizar',
        });
      }
      return field;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  async softDeleteField(id: string): Promise<Field> {
    const field = await this.fieldRepository.findOne({ where: { id } });

    if (!field) {
      throw new ErrorManager({
        type: 'NOT_FOUND',
        message: `El campo con ID ${id} no fue encontrado`,
      });
    }

    field.isActive = false;
    return this.fieldRepository.save(field);
  }

  async deleteField(id: string): Promise<DeleteResult> {
    try {
      const field: DeleteResult = await this.fieldRepository.delete(id);
      if (field.affected === 0) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'No se pudo eliminar el campo',
        });
      }
      return field;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }
}
