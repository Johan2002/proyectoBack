import { IsEmail, IsString, MinLength } from "class-validator";
import { Rol } from "src/Data/entities/rol-entity/rol.entity";

export class registerDto{
  @IsString()
  @MinLength(6)
  userName: string;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  password: string;

}


