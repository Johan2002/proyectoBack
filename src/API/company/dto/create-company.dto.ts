import { IsEmail, IsNotEmpty, IsPhoneNumber, IsString } from 'class-validator';

export class CreateCompanyDto {
  @IsString()
  @IsNotEmpty()
  companyNit: string;

  @IsString()
  @IsNotEmpty()
  companyName: string;

  @IsString()
  @IsNotEmpty()
  companyAddress: string;

  @IsPhoneNumber('CO')
  @IsNotEmpty()
  companyPhone: string;

  @IsEmail()
  @IsNotEmpty()
  companyEmail: string;
}
