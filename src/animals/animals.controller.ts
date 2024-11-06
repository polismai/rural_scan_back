import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseUUIDPipe,
  Query,
  UseGuards,
  UseInterceptors,
  BadRequestException,
  UploadedFile,
} from '@nestjs/common';
import { AnimalsService } from './animals.service';
import { CreateAnimalDto } from './dto/create-animal.dto';
import { UpdateAnimalDto } from './dto/update-animal.dto';
import { ActiveUser } from '../common/decorators/active-user.decorator';
import { UserActiveInterface } from '../common/interfaces/user-active.interface';
import { GetAnimalsFilterDto } from './dto/filtered-animal.dto';
import { AuthGuard } from '../auth/guard/auth.guard';
import { FieldId } from '../auth/decorators/fieldId.decorator';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserRole } from '../common/enums/role.enum';
import { ApiTags } from '@nestjs/swagger';
import { AnimalPotrero } from '../animal-potrero/entities/animal_potrero.entity';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import * as Multer from 'multer';

@ApiTags('Animals')
@UseGuards(AuthGuard)
@Controller('animals')
export class AnimalsController {
  constructor(private readonly animalsService: AnimalsService) {}

  @Post()
  async create(
    @Body() createAnimalDto: CreateAnimalDto,
    @FieldId() fieldId: string,
  ) {
    return await this.animalsService.create(createAnimalDto, fieldId);
  }

  @Post(':fieldId/upload')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads',
        filename: (_req, file, callback) => {
          const fileName = `${Date.now()}-${file.originalname}`;
          callback(null, fileName);
        },
      }),
      fileFilter: (_, file, callback) => {
        if (!file.originalname.match(/\.(xlsx|xls)$/)) {
          return callback(
            new BadRequestException('Only Excel files are allowed!'),
            false,
          );
        }
        callback(null, true);
      },
    }),
  )
  async uploadFile(
    @Param('fieldId', ParseUUIDPipe) fieldId: string,
    @UploadedFile() file: Multer.File,
  ) {
    if (!file) {
      throw new BadRequestException('No file uploaded');
    }
    const animals = await this.animalsService.processFile(file.path, fieldId);
    return { data: animals };
  }

  @Get()
  getAnimals(
    @Query() filterDto: GetAnimalsFilterDto,
    @FieldId() fieldId: string,
  ) {
    return this.animalsService.getAnimals(filterDto, fieldId);
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string, @FieldId() fieldId: string) {
    return this.animalsService.findOne(id, fieldId);
  }

  @Get(':id/potrero-movements')
  async getAnimalPotreroMovements(
    @Param('id', ParseUUIDPipe) animalId: string,
  ): Promise<AnimalPotrero[]> {
    return this.animalsService.getAnimalPotreroMovements(animalId);
  }

  @Patch(':id')
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateAnimalDto: UpdateAnimalDto,
    @ActiveUser() user: UserActiveInterface,
  ) {
    return await this.animalsService.update(id, updateAnimalDto, user);
  }

  @Delete(':id')
  @Roles(UserRole.ADMIN)
  async remove(
    @Param('id', ParseUUIDPipe) id: string,
    @FieldId() fieldId: string,
  ) {
    await this.animalsService.remove(id, fieldId);
    return { message: 'Animal successfully deleted' };
  }
}
