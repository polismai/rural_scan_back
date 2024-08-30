import { Module } from '@nestjs/common';
import { PotrerosService } from './potreros.service';
import { PotrerosController } from './potreros.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Potrero } from './entities/potrero.entity';
import { AnimalPotrero } from '../animal-potrero/entities/animal_potrero.entity';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [TypeOrmModule.forFeature([Potrero, AnimalPotrero])],
  controllers: [PotrerosController],
  providers: [PotrerosService, JwtService],
  exports: [PotrerosService],
})
export class PotrerosModule {}
