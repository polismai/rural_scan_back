import { Module } from '@nestjs/common';
import { AnimalsService } from './animals.service';
import { AnimalsController } from './animals.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Animal } from './entities/animal.entity';
import { JwtService } from '@nestjs/jwt';
import { AnimalPotrero } from '../animal-potrero/entities/animal_potrero.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Animal, AnimalPotrero])],
  controllers: [AnimalsController],
  providers: [AnimalsService, JwtService],
  exports: [AnimalsService, TypeOrmModule],
})
export class AnimalsModule {}
