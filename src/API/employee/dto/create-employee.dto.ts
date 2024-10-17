import { IsEmail, IsNotEmpty, IsPhoneNumber, IsString } from 'class-validator';

export class CreateEmployeeDto {
  @IsString()
  @IsNotEmpty()
  employeeIdentity: string;

  @IsString()
  @IsNotEmpty()
  employeeName: string;

  @IsString()
  @IsNotEmpty()
  employeeLastname: string;

  @IsString()
  @IsNotEmpty()
  employeeAddress: string;

  @IsPhoneNumber('CO')
  @IsNotEmpty()
  employeePhone: string;

  @IsEmail()
  @IsNotEmpty()
  employeeEmail: string;

  @IsString()
  @IsNotEmpty()
  headquarter: string;
}
