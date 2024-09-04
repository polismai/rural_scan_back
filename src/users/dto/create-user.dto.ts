import { Transform } from 'class-transformer';
import {
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsString,
  IsUUID,
  MinLength,
} from 'class-validator';
import { UserRole } from '../../common/enums/role.enum';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    example: 'Maia',
    description: 'El username debe tener como mínimo 3 caracteres',
  })
  @IsString()
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  @IsNotEmpty()
  username: string;

  @ApiProperty({
    example: '1234AbcD',
    description: 'La password debe tener como mínimo 6 caracteres',
  })
  @IsString()
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  @IsNotEmpty()
  @MinLength(6)
  password: string;

  @ApiProperty({
    example: 'fa1b97ee-e242-4df2-97f7-2b349a85bf2a',
    description: 'El fieldId debe ser de tipo UUID',
  })
  @IsUUID()
  fieldId: string;

  @ApiProperty({
    example: 'admin',
    description: 'El role debe ser: SUPERADMIN, ADMIN, USER, VETERINARIAN',
  })
  @IsEnum(UserRole)
  role: UserRole;

  @ApiProperty({
    example: true,
    description: 'Debe especificarse si el usuario está activo o no',
  })
  @IsBoolean()
  active: boolean;
}
