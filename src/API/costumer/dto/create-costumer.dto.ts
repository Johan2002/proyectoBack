import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsPhoneNumber,
  IsString,
  IsUUID,
  MinLength,
} from 'class-validator';

export class CreateCustomerDto {
  @ApiProperty({ description: 'Documento del cliente' })
  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  customerIdentity: string;

  @ApiProperty({ description: 'Nombre del cliente' })
  @IsString()
  @IsNotEmpty()
  customerName: string;

  @ApiProperty({ description: 'Apellido del cliente' })
  @IsString()
  @IsNotEmpty()
  customerLastname: string;

  @ApiProperty({ description: 'Direccion del cliente' })
  @IsString()
  @IsNotEmpty()
  customerAddress: string;

  @ApiProperty({ description: 'Telefono del cliente' })
  @IsPhoneNumber('CO')
  @IsNotEmpty()
  customerPhone: string;

  @ApiProperty({ description: 'Email del cliente' })
  @IsEmail()
  @IsNotEmpty()
  customerEmail: string;

  @ApiProperty({ description: 'Empresa' })
  @IsUUID()
  @IsNotEmpty()
  company: string;
}
