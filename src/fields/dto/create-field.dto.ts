import { Transform } from 'class-transformer';
import { IsString } from 'class-validator';

export class CreateFieldDto {
  @Transform(({ value }) => value.trim())
  @IsString()
  name: string;

  @IsString()
  company: string;
}
