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
import { Auth } from 'src/auth/decorators/auth.decorator';
import { UserRole } from 'src/common/enums/role.enum';
import { PotrerosService } from 'src/potreros/potreros.service';
import { ApiTags } from '@nestjs/swagger';
import { UpdateFieldDto } from './dto/update-field.dto';
// import { UpdateFieldDto } from './dto/update-field.dto';

@ApiTags('Fields')
@Controller('fields')
export class FieldsController {
  constructor(
    private readonly fieldsService: FieldsService,
    private readonly potrerosService: PotrerosService,
  ) {}

  @Auth([UserRole.SUPERADMIN])
  @Post()
  async createField(@Body() createFieldDto: CreateFieldDto) {
    return await this.fieldsService.createField(createFieldDto);
  }

  @Get()
  async getFields() {
    return await this.fieldsService.getFields();
  }

  @Get(':id')
  async getFieldById(@Param('id', ParseUUIDPipe) id: string) {
    return this.fieldsService.getFieldById(id);
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
