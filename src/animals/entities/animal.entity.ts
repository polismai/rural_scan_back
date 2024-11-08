import { Sex } from '../../common/enums/sex.enum';
import { Breed } from '../../common/enums/breed.enum';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { LifeStatus } from '../../common/enums/lifeStatus.enum';
import { Traceability } from '../../common/enums/traceability.enum';
import { Field } from '../../fields/entities/field.entity';
import { AnimalPotrero } from '../../animal-potrero/entities/animal_potrero.entity';

@Entity()
export class Animal {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  tag: string;

  @Column({
    type: 'enum',
    enum: Breed,
  })
  breed: Breed;

  @Column({
    nullable: true,
    type: 'enum',
    enum: Breed,
  })
  crossbreed: Breed;

  @Column({
    type: 'enum',
    enum: Sex,
  })
  sex: Sex;

  @Column()
  born: string;

  @Column({
    type: 'enum',
    enum: LifeStatus,
  })
  lifeStatus: LifeStatus;

  @Column({
    type: 'enum',
    enum: Traceability,
  })
  traceabilityStatus: Traceability;

  @Column({ nullable: true })
  observations: string;

  @Column({ nullable: true })
  motherTag: number;

  @Column({ nullable: true })
  fatherTag: string;

  @Column({ nullable: true })
  disappearanceDate: string;

  @Column({ nullable: true })
  inseminationDate: string;

  @Column({ nullable: true })
  calvingDate: string;

  @CreateDateColumn({
    type: 'timestamp',
    name: 'created_at',
  })
  createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    name: 'updated_at',
  })
  updatedAt: Date;

  @ManyToOne(() => Field)
  @JoinColumn({ name: 'fieldId', referencedColumnName: 'id' })
  field: Field;

  @Column()
  fieldId: string;

  @OneToMany(() => AnimalPotrero, (animalPotrero) => animalPotrero.animal, {
    cascade: ['remove'],
  })
  animalPotreros: AnimalPotrero[];
}
