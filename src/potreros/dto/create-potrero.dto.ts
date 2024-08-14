import {
  IsBoolean,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';
import { ForageStatus } from 'src/common/enums/forage.enum';

export class CreatePotreroDto {
  @IsNumber()
  @Min(0)
  totalHectares: number;

  @IsNumber()
  @Min(0)
  netHectares: number;

  @IsEnum(ForageStatus)
  forageStatus: ForageStatus;

  @IsBoolean()
  isEmpty: boolean;

  @IsString()
  @IsOptional()
  observations?: string;
}
