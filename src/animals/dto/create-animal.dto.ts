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
import { ApiProperty } from '@nestjs/swagger';

export class CreateAnimalDto {
  @ApiProperty({ example: '3333' })
  @IsNumber()
  tag: number;

  @ApiProperty({ example: 'BU' })
  @IsEnum(Breed)
  breed: Breed;

  @ApiProperty({ example: 'AA' })
  @IsEnum(Breed)
  @IsOptional()
  crossbreed: Breed;

  @ApiProperty({ example: 'H' })
  @IsEnum(Sex)
  @IsOptional()
  sex?: Sex;

  @ApiProperty({ example: '2018-09-01' })
  @IsDateString()
  born: string;

  @ApiProperty({ example: 'V' })
  @IsEnum(LifeStatus)
  lifeStatus: LifeStatus;

  @ApiProperty({ example: 'S' })
  @IsEnum(Traceability)
  traceabilityStatus: Traceability;

  @ApiProperty({ example: '' })
  @IsString()
  @IsOptional()
  observations?: string;

  @ApiProperty({ example: '5555' })
  @IsNumber()
  @IsOptional()
  motherTag: number;

  @ApiProperty({ example: '454545' })
  @IsString()
  @IsOptional()
  fatherTag: string;

  @ApiProperty({ example: '2024-07-27' })
  @IsDateString()
  @IsOptional()
  disappearanceDate: string;

  @ApiProperty({ example: '2024-02-06' })
  @IsDateString()
  @IsOptional()
  inseminationDate: string;

  @ApiProperty({ example: '2024-09-03' })
  @IsDateString()
  @IsOptional()
  calvingDate: string;
}
