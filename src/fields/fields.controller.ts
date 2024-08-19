import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { FieldsService } from './fields.service';
import { CreateFieldDto } from './dto/create-field.dto';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { UserRole } from 'src/common/enums/role.enum';
import { CreatePotreroDto } from 'src/potreros/dto/create-potrero.dto';
import { PotrerosService } from 'src/potreros/potreros.service';
// import { UpdateFieldDto } from './dto/update-field.dto';

@Controller('fields')
export class FieldsController {
  constructor(
    private readonly fieldsService: FieldsService,
    private readonly potrerosService: PotrerosService,
  ) {}

  @Post()
  // @Auth(UserRole.SUPERADMIN)
  async create(@Body() createFieldDto: CreateFieldDto) {
    return await this.fieldsService.create(createFieldDto);
  }

  @Post(':id/potrero')
  @Auth([UserRole.ADMIN])
  async createPotrero(
    @Param('id') fieldId: string,
    @Body() createPotreroDto: CreatePotreroDto,
  ) {
    return await this.potrerosService.create(fieldId, createPotreroDto);
  }

  @Get(':id/potreros')
  async getPotreros(@Param('id') fieldId: string) {
    return await this.potrerosService.findPotreros(fieldId);
  }

  @Get()
  async findAll() {
    return await this.fieldsService.findAll();
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.fieldsService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateFieldDto: UpdateFieldDto) {
  //   return this.fieldsService.update(+id, updateFieldDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.fieldsService.remove(+id);
  // }
}
