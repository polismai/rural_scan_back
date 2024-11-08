import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsEmail, IsString } from 'class-validator';

export class CreateCompanyDto {
  @ApiProperty({ example: 'FAKE S.A.' })
  @IsString()
  name: string;

  @ApiProperty({ example: 'true' })
  @IsBoolean()
  active: boolean;

  @ApiProperty({ example: 'Uruguay'})
  @IsString()
  country: string;

  @ApiProperty({ example: 'email@mail.com'})
  @IsEmail()
  email: string;
}
