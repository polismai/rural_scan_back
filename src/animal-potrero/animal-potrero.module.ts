import { Module } from '@nestjs/common';
import { AnimalPotreroService } from './animal-potrero.service';
import { AnimalPotreroController } from './animal-potrero.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AnimalPotrero } from './entities/animal_potrero.entity';
import { AnimalsModule } from '../animals/animals.module';
import { PotrerosModule } from '../potreros/potreros.module';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [
    TypeOrmModule.forFeature([AnimalPotrero]),
    AnimalsModule,
    PotrerosModule,
  ],
  controllers: [AnimalPotreroController],
  providers: [AnimalPotreroService, JwtService],
})
export class AnimalPotreroModule {}
