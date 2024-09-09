import { UserRole } from '../../common/enums/role.enum';

export interface PayloadToken {
  sub: string;
  id: string;
  username: string;
  role: UserRole;
  fieldId: string;
}
