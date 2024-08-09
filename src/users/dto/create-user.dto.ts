import { Transform } from 'class-transformer';
import { IsBoolean, IsEnum, IsString, MinLength } from 'class-validator';
import { UserRole } from '../entities/user.entity';

export class CreateUserDto {
  @Transform(({ value }) => value.trim())
  @IsString()
  username: string;

  @Transform(({ value }) => value.trim())
  @IsString()
  @MinLength(6)
  password: string;

  @IsString()
  company: string;

  @IsEnum(UserRole)
  role: UserRole;

  @IsBoolean()
  active: boolean;
}
