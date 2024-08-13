import { applyDecorators, UseGuards } from '@nestjs/common';
import { UserRole } from '../../common/enums/role.enum';
import { AuthGuard } from '../guard/auth.guard';
import { RolesGuard } from '../guard/roles.guard';
import { Roles } from './roles.decorator';

export function Auth(role: UserRole) {
  return applyDecorators(Roles(role), UseGuards(AuthGuard, RolesGuard));
}
