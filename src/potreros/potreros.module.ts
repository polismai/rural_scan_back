import { Module } from '@nestjs/common';
import { PotrerosService } from './potreros.service';
import { PotrerosController } from './potreros.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Potrero } from './entities/potrero.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Potrero])],
  controllers: [PotrerosController],
  providers: [PotrerosService],
  exports: [PotrerosService],
})
export class PotrerosModule {}
