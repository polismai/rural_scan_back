import { Body, Controller, Post } from '@nestjs/common';
import { AnimalPotreroService } from './animal-potrero.service';
import { MoveAnimalsDto } from './dto/create-animal-potrero.dto';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { UserRole } from 'src/common/enums/role.enum';
import { FieldId } from 'src/auth/decorators/fieldId.decorator';

@Controller('animal-potrero')
export class AnimalPotreroController {
  constructor(private readonly animalPotreroService: AnimalPotreroService) {}

  @Auth([UserRole.ADMIN, UserRole.USER])
  @Post()
  async moveAnimals(
    @Body() moveAnimalsDto: MoveAnimalsDto,
    @FieldId() fieldId: string,
  ) {
    await this.animalPotreroService.moveAnimals(moveAnimalsDto, fieldId);
    return { message: 'Animals moved successfully' };
  }
}
