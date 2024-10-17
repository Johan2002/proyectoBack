import { IsEmail, IsString, MinLength } from "class-validator";

export class registerDto{
  @IsString()
  @MinLength(6)
  userName: string;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  password: string;

  employee: string;

  rol: string;
}


