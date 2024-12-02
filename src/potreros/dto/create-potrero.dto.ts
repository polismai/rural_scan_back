import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsUUID } from 'class-validator';

export class CreatePotreroDto {
  @ApiProperty({ example: '' })
  @IsUUID()
  fieldId: string;
  
  @ApiProperty({ example: 'Potrero 1' })
  @IsString()
  name: string;
}
