import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsString } from 'class-validator';

export class CreateCompanyDto {
  @ApiProperty({ example: 'FAKE S.A.' })
  @IsString()
  name: string;

  @ApiProperty({ example: 'true' })
  @IsBoolean()
  active: boolean;
}
