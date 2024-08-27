import {
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  // Post,
  // Patch,
  // Delete,
} from '@nestjs/common';
import { PotrerosService } from './potreros.service';
// import { CreatePotreroDto } from './dto/create-potrero.dto';
// import { UpdatePotreroDto } from './dto/update-potrero.dto';

@Controller('potrero')
export class PotrerosController {
  constructor(private readonly potrerosService: PotrerosService) {}

  @Get(':id/isEmpty')
  async isPotreroEmpty(
    @Param('id', ParseUUIDPipe) potreroId: string,
  ): Promise<{ isEmpty: boolean }> {
    const isEmpty = await this.potrerosService.isPotreroEmpty(potreroId);
    return { isEmpty };
  }

  @Get(':id/lastEntry')
  async getLastEntryDate(
    @Param('id', ParseUUIDPipe) potreroId: string,
  ): Promise<Date | null> {
    return await this.potrerosService.getLastEntryDate(potreroId);
  }

  @Get(':id/last-vacancy-date')
  async getLastVacancyDate(
    @Param('id', ParseUUIDPipe) potreroId: string,
  ): Promise<Date | null> {
    return await this.potrerosService.getLastVacancyDate(potreroId);
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
