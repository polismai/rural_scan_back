import { ApiProperty } from '@nestjs/swagger';
import { IsUUID, IsDateString, IsOptional } from 'class-validator';

export class MoveAnimalsDto {
  @ApiProperty({ example: '48cb5ba0-4f77-4006-a365-c0029bb1e793' })
  @IsUUID('4', { each: true })
  animalsId: string[];

  @ApiProperty({ example: '0f799a1b-6fa5-4a75-a6e1-e2adc267d13e' })
  @IsUUID()
  potreroId: string;

  @ApiProperty({ example: '2024-09-04' })
  @IsOptional()
  @IsDateString()
  entryDate?: string;
}
