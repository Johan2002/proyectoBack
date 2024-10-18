import { IsEmail, IsNotEmpty, IsPhoneNumber, IsString } from 'class-validator';

export class CreateSupplierDto {
  @IsString()
  @IsNotEmpty()
  supplierNit: string;

  @IsString()
  @IsNotEmpty()
  supplierName: string;

  @IsString()
  @IsNotEmpty()
  supplierAddress: string;

  @IsPhoneNumber('CO')
  @IsNotEmpty()
  supplierPhone: string;

  @IsEmail()
  @IsNotEmpty()
  supplierEmail: string;

  @IsString()
  @IsNotEmpty()
  company: string;
}
