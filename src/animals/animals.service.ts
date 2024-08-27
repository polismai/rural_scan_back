import { Injectable } from '@nestjs/common';
import { CreateAnimalDto } from './dto/create-animal.dto';
import { UpdateAnimalDto } from './dto/update-animal.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Animal } from './entities/animal.entity';
import { Repository } from 'typeorm';
import { ErrorManager } from '../utils/error.manager';
import { UserRole } from '../common/enums/role.enum';
import { GetAnimalsFilterDto } from './dto/filtered-animal.dto';

@Injectable()
export class AnimalsService {
  constructor(
    @InjectRepository(Animal)
    private animalRepository: Repository<Animal>,
  ) {}

  async create(createAnimalDto: CreateAnimalDto): Promise<Animal> {
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
      return await this.animalRepository.save(createAnimalDto);
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  async getAnimals(
    filterDto: GetAnimalsFilterDto,
  ): Promise<{ data: Animal[]; total: number }> {
    const { breed, potreroId, sex, page = 1, limit = 10 } = filterDto;

    try {
      const query = this.animalRepository
        .createQueryBuilder('animal')
        .leftJoinAndSelect('animal.field', 'field');

      if (breed) {
        query.andWhere('animal.breed = :breed', { breed });
      }

      if (potreroId) {
        query.andWhere('animal.potreroId = :potreroId', { potreroId });
      }

      // if (age) {
      //   query.andWhere('animal.age = :age', { age });
      // }

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

  // async findAll(): Promise<Animal[]> {
  //   try {
  //     const animals = await this.animalRepository.find({
  //       relations: ['field'],
  //     });
  //     if (animals.length === 0) {
  //       throw new ErrorManager({
  //         type: 'NOT_FOUND',
  //         message: 'animals not found',
  //       });
  //     }
  //     return animals;
  //   } catch (error) {
  //     throw ErrorManager.createSignatureError(error.message);
  //   }
  // }

  findOne(id: number) {
    return `This action returns a #${id} animal`;
  }

  async update(
    id: string,
    updateAnimalDto: UpdateAnimalDto,
    user,
  ): Promise<Animal> {
    try {
      const animalFound = await this.animalRepository.findOneBy({ id });
      if (!animalFound) {
        throw new ErrorManager({
          type: 'NOT_FOUND',
          message: 'animal not found',
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

  remove(id: string) {
    return `This action removes a #${id} animal`;
  }
}
