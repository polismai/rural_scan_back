import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsUUID, IsOptional, IsNumber, IsEnum } from 'class-validator';
import { ForageStatus } from '../../common/enums/forage.enum';

export class CreatePotreroDto {
  @ApiProperty({ example: '30e77d6d-fc0f-452f-b5d0-1bf3155681b4' })
  @IsUUID()
  fieldId: string;
  
  @ApiProperty({ example: 'Potrero 1' })
  @IsString()
  name: string;

  @ApiProperty({ example: '500' })
  @IsNumber()
  @IsOptional()
  totalHectares: number;

  @ApiProperty({ example: '450' })
  @IsNumber()
  @IsOptional()
  netHectares: number;

  @ApiProperty({ example: 'good' })
  @IsEnum(ForageStatus)
  @IsOptional()
  forageStatus: ForageStatus;

  @ApiProperty({ example: '' })
  @IsString()
  @IsOptional()
  observations?: string;
}
