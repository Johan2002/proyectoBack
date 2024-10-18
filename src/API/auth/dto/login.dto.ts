import { IsEmail, IsString, MinLength } from 'class-validator';

export class loginDto {
  @IsEmail()
  userEmail: string;

  @IsString()
  @MinLength(6)
  userPassword: string;
}
