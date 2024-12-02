import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  UseGuards,
  // Post,
  // Patch,
  // Delete,
} from '@nestjs/common';
import { PotrerosService } from './potreros.service';
import { Auth } from '../auth/decorators/auth.decorator';
import { UserRole } from '../common/enums/role.enum';
import { CreatePotreroDto } from './dto/create-potrero.dto';
import { AuthGuard } from '../auth/guard/auth.guard';
import { FieldId } from '../auth/decorators/fieldId.decorator';
import { Potrero } from './entities/potrero.entity';
import { ApiTags } from '@nestjs/swagger';
// import { CreatePotreroDto } from './dto/create-potrero.dto';
// import { UpdatePotreroDto } from './dto/update-potrero.dto';

@ApiTags('Potreros')
@UseGuards(AuthGuard)
@Controller('potrero')
export class PotrerosController {
  constructor(private readonly potrerosService: PotrerosService) {}

  @Get(':id/isEmpty')
  async isPotreroEmpty(
    @Param('id', ParseUUIDPipe) potreroId: string,
    @FieldId() fieldId: string,
  ): Promise<{ isEmpty: boolean }> {
    const isEmpty = await this.potrerosService.isPotreroEmpty(
      potreroId,
      fieldId,
    );
    return { isEmpty };
  }

  @Get(':id/lastEntry')
  async getLastEntryDate(
    @Param('id', ParseUUIDPipe) potreroId: string,
    @FieldId() fieldId: string,
  ): Promise<{ result: Date | null }> {
    return await this.potrerosService.getLastEntryDate(potreroId, fieldId);
  }

  @Get(':id/lastVacancy')
  async getLastVacancyDate(
    @Param('id', ParseUUIDPipe) potreroId: string,
    @FieldId() fieldId: string,
  ): Promise<{ result: Date | null }> {
    return await this.potrerosService.getLastVacancyDate(potreroId, fieldId);
  }

  @Get()
  async getPotreros(@FieldId() fieldId: string): Promise<Potrero[]> {
    return await this.potrerosService.getPotreros(fieldId);
  }

  @Get(':id')
  async findOne(
    @Param('id', ParseUUIDPipe) id: string,
    @FieldId() fieldId: string,
  ): Promise<Potrero> {
    return await this.potrerosService.findOne(id, fieldId);
  }

  @Post()
  @Auth([UserRole.SUPERADMIN, UserRole.ADMIN])
  async createPotrero(
    @Body() createPotreroDto: CreatePotreroDto,
  ) {
    return await this.potrerosService.create(createPotreroDto);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updatePotreroDto: UpdatePotreroDto) {
  //   return this.potrerosService.update(+id, updatePotreroDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.potrerosService.remove(+id);
  // }
}
