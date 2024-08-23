import { Body, Controller, Post } from '@nestjs/common';
import { AnimalPotreroService } from './animal-potrero.service';
import { MoveAnimalsDto } from './dto/create-animal-potrero.dto';

@Controller('animal-potrero')
export class AnimalPotreroController {
  constructor(private readonly animalPotreroService: AnimalPotreroService) {}

  @Post()
  async moveAnimals(@Body() moveAnimalsDto: MoveAnimalsDto) {
    await this.animalPotreroService.moveAnimals(moveAnimalsDto);
    return { message: 'Animals moved successfully' };
  }
}
