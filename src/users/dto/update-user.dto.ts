import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsOptional } from 'class-validator';
import { UserRole } from '../../common/enums/role.enum';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @IsOptional()
  username?: string;

  @IsOptional()
  password?: string;

  @IsOptional()
  fieldId?: string;

  @IsOptional()
  role?: UserRole;

  @IsOptional()
  active?: boolean;
}
