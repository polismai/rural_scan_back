import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsString, IsUUID } from 'class-validator';

export class CreateFieldDto {
  @ApiProperty({ example: 'Field 1' })
  @IsString()
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  name: string;

  @ApiProperty({ example: 'UY' })
  @IsString()
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  country: string;

  @ApiProperty({ example: 'ASDF234' })
  @IsString()
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  location: string;

  @ApiProperty({ example: '-34.9264248,-54.9309671' })
  @IsString()
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  coords: string;

  @ApiProperty({ example: 'DASDA221' })
  @IsString()
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  owner: string;

  @ApiProperty({ example: 'c443a2e2-393a-4d47-b275-25f1d3efffa2' })
  @IsUUID()
  companyId: string;
}
