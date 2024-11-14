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
import { FieldsService } from './fields.service';
import { CreateFieldDto } from './dto/create-field.dto';
import { Auth } from '../auth/decorators/auth.decorator';
import { UserRole } from '../common/enums/role.enum';
import { PotrerosService } from '../potreros/potreros.service';
import { ApiTags } from '@nestjs/swagger';
import { UpdateFieldDto } from './dto/update-field.dto';
import { Field } from './entities/field.entity';
// import { UpdateFieldDto } from './dto/update-field.dto';

@ApiTags('Fields')
@Auth([UserRole.SUPERADMIN])
@Controller('fields')
export class FieldsController {
  constructor(
    private readonly fieldsService: FieldsService,
    private readonly potrerosService: PotrerosService,
  ) {}

  @Post()
  async createField(@Body() createFieldDto: CreateFieldDto) {
    return await this.fieldsService.createField(createFieldDto);
  }

  @Get('/company/:companyId')
  async getFieldsByCompany(
    @Param('companyId', ParseUUIDPipe) companyId: string,
  ): Promise<Field[]> {
    return await this.fieldsService.getFieldsByCompany(companyId);
  }

  @Get(':id')
  async getFieldById(@Param('id', ParseUUIDPipe) id: string) {
    return this.fieldsService.getFieldById(id);
  }

  @Patch(':id/soft-delete')
  async softDeleteField(@Param('id', ParseUUIDPipe) id: string) {
    return this.fieldsService.softDeleteField(id);
  }

  @Patch(':id/toggle-status')
  async toggleFieldStatus(
    @Param('id') id: string,
    @Body('isActive') isActive: boolean,
  ) {
    return this.fieldsService.toggleFieldStatus(id, isActive);
  }

  @Patch(':id')
  async updateField(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateFieldDto: UpdateFieldDto,
  ) {
    return this.fieldsService.updateField(id, updateFieldDto);
  }

  @Delete(':id')
  async deleteField(@Param('id', ParseUUIDPipe) id: string) {
    return this.fieldsService.deleteField(id);
  }
}
