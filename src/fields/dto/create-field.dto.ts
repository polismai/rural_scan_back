import { Transform } from 'class-transformer';
import { IsString } from 'class-validator';

export class CreateFieldDto {
  @IsString()
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  name: string;

  @IsString()
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  location: string;

  @IsString()
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  owner: string;

  @IsString()
  companyId: string;
}
