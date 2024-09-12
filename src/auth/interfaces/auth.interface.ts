import { UserRole } from '../../common/enums/role.enum';

export interface PayloadToken {
  sub: string;
  id: string;
  username: string;
  role: UserRole;
  fieldId: string;
}

export interface AuthTokenResult {
  sub: string;
  id: string;
  username: string;
  role: string;
  fieldId: string;
  iat: number;
  exp: number;
}

export interface IUseToken {
  sub: string;
  id: string;
  username: string;
  role: string;
  fieldId: string;
  isExpired: boolean;
}
