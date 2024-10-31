import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsPhoneNumber,
  IsString,
  IsUUID,
  MinLength,
} from 'class-validator';

export class CreateEmployeeDto {
  @ApiProperty({ description: 'Documento del empeleado' })
  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  employeeIdentity: string;

  @ApiProperty({ description: 'Nombre del empleado' })
  @IsString()
  @IsNotEmpty()
  employeeName: string;

  @ApiProperty({ description: 'Apellido del empleado' })
  @IsString()
  @IsNotEmpty()
  employeeLastname: string;

  @ApiProperty({ description: 'Direccion del empleado' })
  @IsString()
  @IsNotEmpty()
  employeeAddress: string;

  @ApiProperty({ description: 'Telefono del empleado' })
  @IsPhoneNumber('CO')
  @IsNotEmpty()
  employeePhone: string;

  @ApiProperty({ description: 'Email del empleado' })
  @IsEmail()
  @IsNotEmpty()
  employeeEmail: string;

  @ApiProperty({ description: 'Sede' })
  @IsUUID()
  @IsNotEmpty()
  headquarter: string;
}
