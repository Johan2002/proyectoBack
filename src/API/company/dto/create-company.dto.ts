import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsPhoneNumber,
  IsString,
  MinLength,
} from 'class-validator';

export class CreateCompanyDto {
  @ApiProperty({ description: 'Nit de la empresa' })
  @IsString()
  @IsNotEmpty()
  @MinLength(10)
  companyNit: string;

  @ApiProperty({ description: 'Nombre de la empresa' })
  @IsString()
  @IsNotEmpty()
  companyName: string;

  @ApiProperty({ description: 'Dirrecion de la empresa' })
  @IsString()
  @IsNotEmpty()
  companyAddress: string;

  @ApiProperty({ description: 'Telefono de la empresa' })
  @IsPhoneNumber('CO')
  @IsNotEmpty()
  companyPhone: string;

  @ApiProperty({ description: 'Email de la empresa' })
  @IsEmail()
  @IsNotEmpty()
  companyEmail: string;
}
