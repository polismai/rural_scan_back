import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreatePotreroDto } from './dto/create-potrero.dto';
// import { UpdatePotreroDto } from './dto/update-potrero.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Potrero } from './entities/potrero.entity';
import { IsNull, Not, Repository } from 'typeorm';
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

  async getLastVacancyDate(potreroId: string): Promise<Date | null> {
    // Primero, verificar si hay algún registro con exitDate = null
    const activeEntry = await this.animalPotreroRepository.findOne({
      where: { potreroId, exitDate: IsNull() },
    });

    if (activeEntry) {
      // Si existe un registro con exitDate = null, el potrero no está vacío
      return null;
    }

    // Si no hay registros con exitDate = null, buscar el último registro con exitDate
    const lastExitRecord = await this.animalPotreroRepository.findOne({
      where: { potreroId, exitDate: Not(IsNull()) },
      order: { exitDate: 'DESC' }, // Ordenar por fecha de salida más reciente
    });

    if (lastExitRecord) {
      return lastExitRecord.exitDate;
    }

    // Si no hay registros de salida, devolver null
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
