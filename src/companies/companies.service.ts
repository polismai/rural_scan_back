import { Injectable } from '@nestjs/common';
import { CreateCompanyDto } from './dto/create-company.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Company } from './entities/company.entity';
import { Repository, UpdateResult, DeleteResult } from 'typeorm';
import { ErrorManager } from 'src/utils/error.manager';
import { UpdateCompanyDto } from './dto/update-company.dto';

@Injectable()
export class CompaniesService {
  constructor(
    @InjectRepository(Company)
    private readonly companyRepository: Repository<Company>,
  ) {}

  async createCompany({ name, active }: CreateCompanyDto): Promise<Company> {
    try {
      const companyFound: Company = await this.companyRepository.findOneBy({
        name,
      });
      if (companyFound) {
        throw new ErrorManager({
          type: 'CONFLICT',
          message: `La compania ${name} ya existe`,
        });
      }
      return await this.companyRepository.save({ name, active });
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  async findCompanies(): Promise<Company[]> {
    try {
      const companies: Company[] = await this.companyRepository.find({
        relations: {
          fields: true,
        },
      });
      if (companies.length === 0) {
        throw new ErrorManager({
          type: 'NOT_FOUND',
          message: 'No se encontraron compañías',
        });
      }
      return companies;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  async getCompanyById(id: string): Promise<Company> {
    try {
      const company: Company = await this.companyRepository.findOneBy({ id });
      if (!company) {
        throw new ErrorManager({
          type: 'NOT_FOUND',
          message: 'company not found',
        });
      }
      return company;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  async toggleCompanyStatus(id: string, isActive: boolean): Promise<Company> {
    const company = await this.companyRepository.findOne({ where: { id } });

    if (!company) {
      throw new ErrorManager({
        type: 'NOT_FOUND',
        message: `La compañía con ID ${id} no fue encontrada`,
      });
    }

    company.active = isActive;
    return this.companyRepository.save(company);
  }

  async updateCompany(
    id: string,
    updateCompanyDto: UpdateCompanyDto,
  ): Promise<UpdateResult> {
    try {
      const company: UpdateResult = await this.companyRepository.update(
        id,
        updateCompanyDto,
      );
      if (company.affected === 0) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'la compania no se pudo actualizar',
        });
      }
      return company;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  async deleteCompany(id: string): Promise<DeleteResult> {
    try {
      const company: DeleteResult = await this.companyRepository.delete(id);
      if (company.affected === 0) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'No se pudo eliminar la compania',
        });
      }
      return company;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }
}
