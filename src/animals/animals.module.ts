import { Module } from '@nestjs/common';
import { AnimalsService } from './animals.service';
import { AnimalsController } from './animals.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Animal } from './entities/animal.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([Animal]), AuthModule],
  controllers: [AnimalsController],
  providers: [AnimalsService],
  exports: [AnimalsService, TypeOrmModule],
})
export class AnimalsModule {}
