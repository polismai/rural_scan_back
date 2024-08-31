import { Injectable } from '@nestjs/common';
import { CreateAnimalDto } from './dto/create-animal.dto';
import { UpdateAnimalDto } from './dto/update-animal.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Animal } from './entities/animal.entity';
import { Repository } from 'typeorm';
import { ErrorManager } from '../utils/error.manager';
import { UserRole } from '../common/enums/role.enum';
import { GetAnimalsFilterDto } from './dto/filtered-animal.dto';
import { AnimalPotrero } from 'src/animal-potrero/entities/animal_potrero.entity';

@Injectable()
export class AnimalsService {
  constructor(
    @InjectRepository(Animal)
    private animalRepository: Repository<Animal>,
  ) {}

  async create(
    createAnimalDto: CreateAnimalDto,
    fieldId: string,
  ): Promise<Animal> {
    try {
      const animalFound = await this.animalRepository.findOneBy({
        tag: createAnimalDto.tag,
      });
      if (animalFound) {
        throw new ErrorManager({
          type: 'CONFLICT',
          message: 'animal already exists',
        });
      }

      const newAnimal = this.animalRepository.create({
        ...createAnimalDto,
        fieldId,
      });

      return await this.animalRepository.save(newAnimal);
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  async getAnimals(
    filterDto: GetAnimalsFilterDto,
    fieldId: string,
  ): Promise<{ data: Animal[]; total: number }> {
    const { breed, potreroId, sex, age, page = 1, limit = 10 } = filterDto;

    try {
      const query = this.animalRepository
        .createQueryBuilder('animal')
        .leftJoinAndSelect('animal.field', 'field')
        .leftJoinAndSelect(
          (subQuery) =>
            subQuery
              .select('animalPotrero')
              .from(AnimalPotrero, 'animalPotrero')
              .where('animalPotrero.exitDate IS NULL')
              .andWhere('animalPotrero.animalId = animal.id'),
          'currentPotrero',
        )
        .leftJoinAndSelect('currentPotrero.potrero', 'potrero')
        .where({ fieldId });

      if (breed) {
        query.andWhere('animal.breed = :breed', { breed });
      }

      if (potreroId) {
        query.andWhere('animal.potreroId = :potreroId', { potreroId });
      }

      if (age) {
        const currentDate = new Date();
        const currentYear = currentDate.getFullYear();
        const currentMonth = currentDate.getMonth();

        // Calculate the date range for animals of the specified age
        const startYear = currentYear - age;
        const startDate = new Date(startYear, currentMonth, 1); // First day of the month
        const endDate = new Date(startYear + 1, currentMonth, 0); // Last day of the previous month

        query.andWhere('animal.born BETWEEN :startDate AND :endDate', {
          startDate: startDate.toISOString().split('T')[0],
          endDate: endDate.toISOString().split('T')[0],
        });
      }

      if (sex) {
        query.andWhere('animal.sex = :sex', { sex });
      }

      // Paginación
      const total = await query.getCount();
      query.skip((page - 1) * limit).take(limit);

      const animals = await query.getMany();

      if (animals.length === 0) {
        throw new ErrorManager({
          type: 'NOT_FOUND',
          message: 'No animals found with the specified criteria',
        });
      }
      return { data: animals, total };
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  async findAnimalsByFieldId(fieldId: string): Promise<Animal[]> {
    return await this.animalRepository.find({
      where: { fieldId },
    });
  }

  async findOne(id: string, fieldId: string): Promise<Animal> {
    try {
      const animal = await this.animalRepository.findOne({
        where: { id, fieldId },
        relations: ['field', 'potrero'],
      });

      if (!animal) {
        throw new ErrorManager({
          type: 'FORBIDDEN',
          message:
            'Animal not found or you do not have permission to update it',
        });
      }
      return animal;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  async update(
    id: string,
    updateAnimalDto: UpdateAnimalDto,
    user,
  ): Promise<Animal> {
    try {
      const animalFound = await this.animalRepository.findOne({
        where: { id, fieldId: user.fieldId },
      });

      if (!animalFound) {
        throw new ErrorManager({
          type: 'FORBIDDEN',
          message:
            'Animal not found or you do not have permission to update it',
        });
      }

      if (updateAnimalDto.lifeStatus && user.role !== UserRole.ADMIN) {
        throw new ErrorManager({
          type: 'FORBIDDEN',
          message: 'You do not have permission to update lifeStatus',
        });
      }

      const updatedAnimal = this.animalRepository.merge(
        animalFound,
        updateAnimalDto,
      );
      return await this.animalRepository.save(updatedAnimal);
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  async remove(id: string, fieldId: string) {
    try {
      const animal = await this.animalRepository.findOne({
        where: { id, fieldId },
      });

      if (!animal) {
        throw new ErrorManager({
          type: 'NOT_FOUND',
          message:
            'Animal not found or you do not have permission to delete it',
        });
      }

      await this.animalRepository.remove(animal);
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }
}
