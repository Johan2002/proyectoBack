import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export class CreateRolDto {
  @ApiProperty({ description: 'Nombre del rol' })
  @IsString()
  @IsNotEmpty()
  rolName: string;

  @ApiProperty({ description: 'Descripcion del rol' })
  @IsString()
  @IsNotEmpty()
  rolDescription: string;

  @ApiProperty({ description: 'Estado del rol' })
  @IsBoolean()
  rolStatus: boolean;
}
