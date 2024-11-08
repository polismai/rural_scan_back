import { IsEnum, IsInt,IsString, IsOptional, IsUUID, Min } from 'class-validator';
import { Breed } from '../../common/enums/breed.enum';
import { Sex } from '../../common/enums/sex.enum';
import { Transform } from 'class-transformer';

export class GetAnimalsFilterDto {
  @IsOptional()
  @IsEnum(Breed)
  breed?: Breed;

  @IsOptional()
  @IsString()
  tag?: string;

  @IsOptional()
  @IsUUID()
  potreroId?: string;

  @IsOptional()
  @IsUUID()
  fieldId?: string;

  @Transform(({ value }) => parseInt(value, 10))
  @IsOptional()
  @IsInt()
  @Min(0)
  age?: number;

  @IsEnum(Sex)
  @IsOptional()
  sex?: Sex;

  @IsOptional()
  @IsInt()
  page?: number;

  @IsOptional()
  @IsInt()
  limit?: number;
}
