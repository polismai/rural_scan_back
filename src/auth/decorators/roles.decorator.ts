import { SetMetadata } from '@nestjs/common';
import { UserRole } from '../../common/enums/role.enum';
import { ROLES_KEY } from '../constants/key-decorators';

export const Roles = (...roles: UserRole[]) => SetMetadata(ROLES_KEY, roles);
export { ROLES_KEY };
