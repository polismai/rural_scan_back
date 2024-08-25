import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';
import { ForageStatus } from 'src/common/enums/forage.enum';

export class CreatePotreroDto {
  @IsNumber()
  totalHectares: number;

  @IsNumber()
  netHectares: number;

  @IsEnum(ForageStatus)
  forageStatus: ForageStatus;

  @IsString()
  @IsOptional()
  observations?: string;
}
