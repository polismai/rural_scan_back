import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  ParseUUIDPipe,
  Patch,
  Delete,
} from '@nestjs/common';
import { CompaniesService } from './companies.service';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UserRole } from 'src/common/enums/role.enum';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { ApiTags } from '@nestjs/swagger';
import { UpdateCompanyDto } from './dto/update-company.dto';

@ApiTags('Companies')
@Auth([UserRole.SUPERADMIN])
@Controller('companies')
export class CompaniesController {
  constructor(private readonly companiesService: CompaniesService) {}

  @Post()
  async createCompany(@Body() createCompanyDto: CreateCompanyDto) {
    return await this.companiesService.createCompany(createCompanyDto);
  }

  @Get()
  async findCompanies() {
    return await this.companiesService.findCompanies();
  }

  @Get(':id')
  async getCompanyById(@Param('id', ParseUUIDPipe) id: string) {
    return this.companiesService.getCompanyById(id);
  }

  @Patch(':id/toggle-status')
  async toggleCompanyStatus(
    @Param('id') id: string,
    @Body('isActive') isActive: boolean,
  ) {
    return this.companiesService.toggleCompanyStatus(id, isActive);
  }

  // @Patch(':id/soft-delete')
  // async softDeleteCompany(@Param('id', ParseUUIDPipe) id: string) {
  //   return this.companiesService.softDeleteCompany(id);
  // }

  @Patch(':id')
  async updateCompany(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateCompanyDto: UpdateCompanyDto,
  ) {
    return await this.companiesService.updateCompany(id, updateCompanyDto);
  }

  @Delete(':id')
  async deleteCompany(@Param('id', ParseUUIDPipe) id: string) {
    return await this.companiesService.deleteCompany(id);
  }
}
