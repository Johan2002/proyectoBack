import { IsBoolean, IsNotEmpty, IsString } from "class-validator";

export class CreateRolDto {
  @IsString()
  @IsNotEmpty()
  rolName: string;
  @IsString()
  @IsNotEmpty()
  rolDescription: string;
  @IsBoolean()
  rolStatus: boolean;
}
