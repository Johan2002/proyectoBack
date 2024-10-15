import { IsEmail, IsNotEmpty, IsPhoneNumber, IsString } from "class-validator";

export class CreateSupplierDto {
  supplierId: string;
  @IsString()
  @IsNotEmpty()
  nit: string;
  
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  address: string;

  @IsPhoneNumber('CO')
  @IsNotEmpty()
  phone: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  company?: string;
}
