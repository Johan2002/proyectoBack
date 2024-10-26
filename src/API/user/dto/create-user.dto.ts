import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ description: 'Nombre del usuario' })
  @IsString()
  @IsNotEmpty()
  userName: string;
  @ApiProperty({ description: 'Contraseña del usuario' })
  @IsString()
  @IsNotEmpty()
  userPassword: string;
  @ApiProperty({ description: 'Email del usuario' })
  @IsString()
  @IsNotEmpty()
  userEmail: string;
  @ApiProperty({ description: 'ID del empleado' })
  @IsUUID()
  @IsNotEmpty()
  employeeId: string;
  @ApiProperty({ description: 'ID del rol' })
  @IsUUID()
  @IsNotEmpty()
  rolId: string;
}
