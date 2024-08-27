import { Module } from '@nestjs/common';
import { AnimalsService } from './animals.service';
import { AnimalsController } from './animals.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Animal } from './entities/animal.entity';
import { AuthModule } from 'src/auth/auth.module';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [TypeOrmModule.forFeature([Animal]), AuthModule],
  controllers: [AnimalsController],
  providers: [AnimalsService, JwtService],
  exports: [AnimalsService, TypeOrmModule],
})
export class AnimalsModule {}
