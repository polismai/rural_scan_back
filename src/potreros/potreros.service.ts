import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreatePotreroDto } from './dto/create-potrero.dto';
// import { UpdatePotreroDto } from './dto/update-potrero.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Potrero } from './entities/potrero.entity';
import { IsNull, Repository } from 'typeorm';
import { ErrorManager } from 'src/utils/error.manager';
import { AnimalPotrero } from 'src/animal-potrero/entities/animal_potrero.entity';

@Injectable()
export class PotrerosService {
  constructor(
    @InjectRepository(Potrero)
    private readonly potreroRepository: Repository<Potrero>,
    @InjectRepository(AnimalPotrero)
    private readonly animalPotreroRepository: Repository<AnimalPotrero>,
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

  async findPotreros(fieldId: string): Promise<Potrero[]> {
    try {
      const potreros: Potrero[] = await this.potreroRepository.find({
        where: { fieldId },
      });

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

  async isPotreroEmpty(potreroId: string): Promise<boolean> {
    const animalsInPotrero = await this.animalPotreroRepository.count({
      where: { potreroId, exitDate: IsNull() },
    });
    return !!!animalsInPotrero;
  }

  async getLastEntryDate(potreroId: string): Promise<Date | null> {
    const lastEntry = await this.animalPotreroRepository.findOne({
      where: { potreroId, exitDate: IsNull() },
      order: { entryDate: 'DESC' }, // Ordenar por fecha de entrada más reciente
    });

    if (lastEntry) {
      return lastEntry.entryDate;
    }
    return null;
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
