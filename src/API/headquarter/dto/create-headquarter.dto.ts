import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class CreateHeadquarterDto {
  @ApiProperty({ description: 'Nombre de la sede' })
  @IsString()
  @IsNotEmpty()
  headquarterName: string;

  @ApiProperty({ description: 'Dirreccion de la sede' })
  @IsString()
  @IsNotEmpty()
  headquarterAddress: string;

  @ApiProperty({ description: 'ID de la empresa' })
  @IsUUID()
  @IsNotEmpty()
  company: string;
}
