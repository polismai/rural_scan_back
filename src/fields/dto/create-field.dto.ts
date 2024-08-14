import { Transform } from 'class-transformer';
import { IsString } from 'class-validator';

export class CreateFieldDto {
  @Transform(({ value }) => value.trim())
  @IsString()
  name: string;

  @Transform(({ value }) => value.trim())
  @IsString()
  location: string;

  @Transform(({ value }) => value.trim())
  @IsString()
  owner: string;

  @IsString()
  companyId: string;
}
