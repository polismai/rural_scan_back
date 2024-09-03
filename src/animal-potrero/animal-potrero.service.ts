import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AnimalPotrero } from './entities/animal_potrero.entity';
import { In, IsNull, Repository } from 'typeorm';
import { MoveAnimalsDto } from './dto/create-animal-potrero.dto';
import { ErrorManager } from '../utils/error.manager';
import { Animal } from '../animals/entities/animal.entity';
import { Potrero } from '../potreros/entities/potrero.entity';

@Injectable()
export class AnimalPotreroService {
  constructor(
    @InjectRepository(AnimalPotrero)
    private readonly animalPotreroRepository: Repository<AnimalPotrero>,
    @InjectRepository(Potrero)
    private readonly potreroRepository: Repository<Potrero>,
    @InjectRepository(Animal)
    private readonly animalRepository: Repository<Animal>,
  ) {}

  async moveAnimals(
    { animalsId, potreroId, entryDate }: MoveAnimalsDto,
    fieldId: string,
  ) {
    const entry = entryDate || new Date();

    try {
      const potrero = await this.potreroRepository.findOne({
        where: { id: potreroId, fieldId },
      });

      if (!potrero) {
        throw new ErrorManager({
          type: 'FORBIDDEN',
          message: 'Potrero not found or does not belong to your field',
        });
      }

      // Verificar que todos los animales pertenecen al fieldId
      const animals = await this.animalRepository.find({
        where: { id: In(animalsId), fieldId },
      });

      if (animals.length !== animalsId.length) {
        throw new ErrorManager({
          type: 'FORBIDDEN',
          message:
            'One or more animals not found or do not belong to your field',
        });
      }

      // Usar una transacción para asegurar consistencia
      await this.animalPotreroRepository.manager.transaction(
        async (transactionalEntityManager) => {
          // Actualizar el registro actual del animal con fecha de egreso
          await transactionalEntityManager.update(
            AnimalPotrero,
            { animalId: In(animalsId), exitDate: IsNull() },
            { exitDate: entry },
          );

          // Crear nuevos registros en animalPotrero
          const newAnimalPotreros = animalsId.map((animalId) =>
            this.animalPotreroRepository.create({
              animalId,
              potreroId,
              entryDate: entry,
              exitDate: null,
            }),
          );

          await transactionalEntityManager.save(
            AnimalPotrero,
            newAnimalPotreros,
          );
        },
      );
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }
}
// @Injectable()
// export class AnimalPotreroService {
//   constructor(
//     @InjectRepository(AnimalPotrero)
//     private readonly animalPotreroRepository: Repository<AnimalPotrero>,
//     @InjectRepository(Potrero)
//     private readonly potreroRepository: Repository<Potrero>,
//     @InjectRepository(Animal)
//     private readonly animalRepository: Repository<Animal>,
//   ) {}

//   async moveAnimals(
//     { animalsId, potreroId, entryDate }: MoveAnimalsDto,
//     fieldId: string,
//   ) {
//     try {
//       const entry = entryDate || new Date();

//     // Verificar que el potrero pertenece al fieldId
//     const potrero = await this.potreroRepository.findOne({
//       where: { id: potreroId, fieldId },
//     });

//     if (!potrero) {
//       throw new ErrorManager({
//         type: 'FORBIDDEN',
//         message: 'Potrero not found or does not belong to your field',
//       });
//     }

//     // Verificar que todos los animales pertenecen al fieldId
//     const animals = await this.animalRepository.find({
//       where: { id: In(animalsId), fieldId },
//     });

//     if (animals.length !== animalsId.length) {
//       throw new ErrorManager({
//         type: 'FORBIDDEN',
//         message: 'One or more animals not found or do not belong to your field',
//       });
//     }

//     // Proceder con el movimiento de animales
//     for (const animalId of animalsId) {
//       // Actualizar el registro actual del animal con fecha de egreso
//       const existingAnimal = await this.animalPotreroRepository.findOne({
//         where: { animalId, exitDate: IsNull() },
//       });

//       if (existingAnimal) {
//         await this.animalPotreroRepository.update(
//           { id: existingAnimal.id },
//           { exitDate: entry },
//         );
//       }

//       const newAnimalPotrero = this.animalPotreroRepository.create({
//         animalId,
//         potreroId,
//         entryDate: entry,
//         exitDate: null,
//       });

//       await this.animalPotreroRepository.save(newAnimalPotrero);
//     }
//   } catch (error) {
//       throw ErrorManager.createSignatureError(error.message);
//
