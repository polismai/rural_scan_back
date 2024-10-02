import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsString, IsUUID } from 'class-validator';

export class CreateFieldDto {
  @ApiProperty({ example: 'Field 1' })
  @IsString()
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  name: string;

  @ApiProperty({ example: 'ASDF234' })
  @IsString()
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  location: string;

  @ApiProperty({ example: 'DASDA221' })
  @IsString()
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  owner: string;

  @ApiProperty({ example: 'c443a2e2-393a-4d47-b275-25f1d3efffa2' })
  @IsUUID()
  companyId: string;
}
