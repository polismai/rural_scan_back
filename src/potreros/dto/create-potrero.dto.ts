import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';
import { ForageStatus } from 'src/common/enums/forage.enum';

export class CreatePotreroDto {
  @IsString()
  name: string;

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
