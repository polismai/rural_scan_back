import { IsBoolean, IsOptional, IsString, MinLength } from 'class-validator';
import { Transform } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({
    example: 'Maia',
    description: 'El username debe tener como mínimo 3 caracteres',
  })
  @IsString()
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  username: string;

  @ApiProperty({
    example: '1234AbcD',
    description: 'La password debe tener como mínimo 6 caracteres',
  })
  @IsString()
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  @MinLength(6)
  password: string;

  @ApiProperty({
    example: true,
  })
  @IsOptional()
  @IsBoolean()
  rememberMe?: boolean;
}
