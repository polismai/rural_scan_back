import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  // Patch,
  // Param,
  // Delete,
} from '@nestjs/common';
import { PotrerosService } from './potreros.service';
import { CreatePotreroDto } from './dto/create-potrero.dto';
// import { UpdatePotreroDto } from './dto/update-potrero.dto';

@Controller('potreros/:fieldId')
export class PotrerosController {
  constructor(private readonly potrerosService: PotrerosService) {}

  @Post()
  async create(
    @Param('fieldId') fieldId: string,
    @Body() createPotreroDto: CreatePotreroDto,
  ) {
    return await this.potrerosService.create(fieldId, createPotreroDto);
  }

  @Get()
  async findAll() {
    return await this.potrerosService.findAll();
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.potrerosService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updatePotreroDto: UpdatePotreroDto) {
  //   return this.potrerosService.update(+id, updatePotreroDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.potrerosService.remove(+id);
  // }
}
