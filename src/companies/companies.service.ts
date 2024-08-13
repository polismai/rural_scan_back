import { Injectable } from '@nestjs/common';
import { CreateCompanyDto } from './dto/create-company.dto';
// import { UpdateCompanyDto } from './dto/update-company.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Company } from './entities/company.entity';
import { Repository } from 'typeorm';
import { ErrorManager } from 'src/utils/error.manager';

@Injectable()
export class CompaniesService {
  constructor(
    @InjectRepository(Company)
    private readonly companyRepository: Repository<Company>,
  ) {}

  async create({ name, active }: CreateCompanyDto) {
    try {
      const companyFound: Company = await this.companyRepository.findOneBy({
        name,
      });
      if (companyFound) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: `the company ${name} already exists`,
        });
      }
      return await this.companyRepository.save({ name, active });
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  async findAll() {
    try {
      const companies: Company[] = await this.companyRepository.find({
        relations: {
          fields: true,
        },
      });
      if (companies.length === 0) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'companies not found',
        });
      }
      return companies;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  // findOne(id: string) {
  //   return `This action returns a #${id} company`;
  // }

  // update(id: string, updateCompanyDto: UpdateCompanyDto) {
  //   return `This action updates a #${id} company`;
  // }

  // remove(id: string) {
  //   return `This action removes a #${id} company`;
  // }
}
