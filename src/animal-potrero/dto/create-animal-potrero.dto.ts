import { IsUUID, IsDateString, IsOptional } from 'class-validator';

export class MoveAnimalsDto {
  @IsUUID('4', { each: true })
  animalsId: string[];

  @IsUUID()
  potreroId: string;

  @IsOptional()
  @IsDateString()
  entryDate?: string;
}
