import {
  IsDate,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { Breed } from '../../common/enums/breed.enum';
import { Sex } from '../../common/enums/sex.enum';
import { LifeStatus } from '../../common/enums/lifeStatus.enum';
import { Traceability } from '../../common/enums/traceability.enum';
import { Type } from 'class-transformer';

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

  @IsDate()
  @Type(() => Date)
  // @Transform(({ value }) => new Date(value))
  born: Date;

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

  @IsDate()
  @Type(() => Date)
  disappearanceDate: Date;

  @IsDate()
  @Type(() => Date)
  inseminationDate: Date;

  @IsDate()
  @Type(() => Date)
  calvingDate: Date;

  @IsString()
  fieldId: string;
}
