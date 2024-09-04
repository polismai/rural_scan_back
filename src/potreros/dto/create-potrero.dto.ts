import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';
import { ForageStatus } from 'src/common/enums/forage.enum';

export class CreatePotreroDto {
  @ApiProperty({ example: 'Potrero 1' })
  @IsString()
  name: string;

  @ApiProperty({ example: '500' })
  @IsNumber()
  totalHectares: number;

  @ApiProperty({ example: '450' })
  @IsNumber()
  netHectares: number;

  @ApiProperty({ example: 'good' })
  @IsEnum(ForageStatus)
  forageStatus: ForageStatus;

  @ApiProperty({ example: '' })
  @IsString()
  @IsOptional()
  observations?: string;
}
