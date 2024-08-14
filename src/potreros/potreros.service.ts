import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreatePotreroDto } from './dto/create-potrero.dto';
// import { UpdatePotreroDto } from './dto/update-potrero.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Potrero } from './entities/potrero.entity';
import { Repository } from 'typeorm';
import { ErrorManager } from 'src/utils/error.manager';

@Injectable()
export class PotrerosService {
  constructor(
    @InjectRepository(Potrero)
    private readonly potreroRepository: Repository<Potrero>,
  ) {}

  async create(
    fieldId: string,
    createPotreroDto: CreatePotreroDto,
  ): Promise<Potrero> {
    try {
      const potrero = this.potreroRepository.create({
        ...createPotreroDto,
        fieldId,
      });
      return await this.potreroRepository.save(potrero);
    } catch (error) {
      throw new InternalServerErrorException(
        'failed to create potrero',
        error.message,
      );
    }
  }

  async findAll() {
    try {
      const potreros: Potrero[] = await this.potreroRepository.find();
      if (potreros.length === 0) {
        throw new ErrorManager({
          type: 'NOT_FOUND',
          message: 'potreros not found',
        });
      }
      return potreros;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  // findOne(id: number) {
  //   return `This action returns a #${id} potrero`;
  // }

  // update(id: number, updatePotreroDto: UpdatePotreroDto) {
  //   return `This action updates a #${id} potrero`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} potrero`;
  // }
}
