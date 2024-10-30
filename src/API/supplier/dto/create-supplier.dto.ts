import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsPhoneNumber,
  IsString,
  IsUUID,
} from 'class-validator';

export class CreateSupplierDto {
  @ApiProperty({ description: 'Nit del proveedor' })
  @IsString()
  @IsNotEmpty()
  supplierNit: string;

  @ApiProperty({ description: 'Nombre del proveedor' })
  @IsString()
  @IsNotEmpty()
  supplierName: string;

  @ApiProperty({ description: 'Direccion del proveedor' })
  @IsString()
  @IsNotEmpty()
  supplierAddress: string;

  @ApiProperty({ description: 'Telefono del proveedor' })
  @IsPhoneNumber('CO')
  @IsNotEmpty()
  supplierPhone: string;

  @ApiProperty({ description: 'Email del proveedor' })
  @IsEmail()
  @IsNotEmpty()
  supplierEmail: string;

  @ApiProperty({ description: 'ID de la empresa' })
  @IsUUID()
  @IsNotEmpty()
  company: string;
}
