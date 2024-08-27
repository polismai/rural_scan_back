import { IsEnum, IsInt, IsOptional, IsUUID } from 'class-validator';
import { Breed } from '../../common/enums/breed.enum';
import { Sex } from '../../common/enums/sex.enum';

export class GetAnimalsFilterDto {
  @IsOptional()
  @IsEnum(Breed)
  breed?: Breed;

  @IsOptional()
  @IsUUID()
  potreroId?: string;

  // @IsOptional()
  // @IsInt()
  // age?: number;

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
