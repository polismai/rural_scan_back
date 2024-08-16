import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { AnimalsService } from './animals.service';
import { CreateAnimalDto } from './dto/create-animal.dto';
import { UpdateAnimalDto } from './dto/update-animal.dto';
// import { Auth } from '../auth/decorators/auth.decorator';
// import { UserRole } from '../common/enums/role.enum';
import { ActiveUser } from '../common/decorators/active-user.decorator';
import { UserActiveInterface } from '../common/interfaces/user-active.interface';

@Controller('animals')
export class AnimalsController {
  constructor(private readonly animalsService: AnimalsService) {}

  @Post()
  async create(@Body() createAnimalDto: CreateAnimalDto) {
    return await this.animalsService.create(createAnimalDto);
  }

  @Get()
  async findAll() {
    return await this.animalsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.animalsService.findOne(+id);
  }

  @Patch(':id')
  // @Auth(UserRole.USER)
  async update(
    @Param('id') id: string,
    @Body() updateAnimalDto: UpdateAnimalDto,
    @ActiveUser() user: UserActiveInterface,
  ) {
    return await this.animalsService.update(id, updateAnimalDto, user);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.animalsService.remove(id);
  }
}
