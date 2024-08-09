import { IsBoolean, IsString } from 'class-validator';

export class CreateCompanyDto {
  @IsString()
  name: string;

  @IsBoolean()
  active: boolean;
}
