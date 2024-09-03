import { Controller, Get, Post, Body } from '@nestjs/common';
import { FieldsService } from './fields.service';
import { CreateFieldDto } from './dto/create-field.dto';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { UserRole } from 'src/common/enums/role.enum';
import { PotrerosService } from 'src/potreros/potreros.service';
// import { UpdateFieldDto } from './dto/update-field.dto';

@Controller('fields')
export class FieldsController {
  constructor(
    private readonly fieldsService: FieldsService,
    private readonly potrerosService: PotrerosService,
  ) {}

  @Auth([UserRole.SUPERADMIN])
  @Post()
  async create(@Body() createFieldDto: CreateFieldDto) {
    return await this.fieldsService.create(createFieldDto);
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
