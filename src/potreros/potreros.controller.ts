import {
  Controller,
  Get,
  Param,
  // Post,
  // Body,
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
    @Param('id') potreroId: string,
  ): Promise<{ isEmpty: boolean }> {
    const isEmpty = await this.potrerosService.isPotreroEmpty(potreroId);
    return { isEmpty };
  }

  // @Get(':id/lastEntry')
  //buscar registro en la tabla animal-potrero, si no se encuentra ningun registro, la fecha es null, si se encuentra, devuelve la ultima fecha mas actual de entrydate

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
