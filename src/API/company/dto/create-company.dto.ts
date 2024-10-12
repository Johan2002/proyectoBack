import { IsEmail, IsNotEmpty, IsPhoneNumber, IsString } from 'class-validator';

export class CreateCompanyDto {
  companyId: string;

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
  phone: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  headquarters?: string;

  suppliers?: string;

  costumers?: string;
}
