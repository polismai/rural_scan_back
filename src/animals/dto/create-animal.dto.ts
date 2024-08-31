import {
  IsDateString,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { Breed } from '../../common/enums/breed.enum';
import { Sex } from '../../common/enums/sex.enum';
import { LifeStatus } from '../../common/enums/lifeStatus.enum';
import { Traceability } from '../../common/enums/traceability.enum';

export class CreateAnimalDto {
  @IsNumber()
  tag: number;

  @IsEnum(Breed)
  breed: Breed;

  @IsEnum(Breed)
  crossbreed: Breed;

  @IsEnum(Sex)
  @IsOptional()
  sex?: Sex;

  @IsDateString()
  born: string;

  @IsEnum(LifeStatus)
  lifeStatus: LifeStatus;

  @IsEnum(Traceability)
  traceabilityStatus: Traceability;

  @IsString()
  @IsOptional()
  observations?: string;

  @IsNumber()
  motherTag: number;

  @IsString()
  fatherTag: string;

  @IsDateString()
  disappearanceDate: string;

  @IsDateString()
  inseminationDate: string;

  @IsDateString()
  calvingDate: string;
}
