import { IsEmail, IsNotEmpty, IsPhoneNumber, IsString } from 'class-validator';

export class CreateCustomerDto {
  @IsString()
  @IsNotEmpty()
  customerIdentity: string;

  @IsString()
  @IsNotEmpty()
  customerName: string;

  @IsString()
  @IsNotEmpty()
  customerLastname: string;

  @IsString()
  @IsNotEmpty()
  customerAddress: string;

  @IsPhoneNumber('CO')
  @IsNotEmpty()
  customerPhone: string;

  @IsEmail()
  @IsNotEmpty()
  customerEmail: string;

  @IsString()
  @IsNotEmpty()
  company: string;
}
