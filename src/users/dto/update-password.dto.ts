import { IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdatePasswordDto {
  @ApiProperty({
    example: '1234AbcD',
    description: 'La password debe tener como mínimo 6 caracteres',
  })
  @IsString()
  @MinLength(6)
  password: string;
}
