import { IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  userName: string;

  @IsString()
  @IsNotEmpty()
  userPassword: string;

  @IsString()
  @IsNotEmpty()
  userEmail: string;

  @IsUUID()
  employeeId: string;

  @IsUUID()
  rolId: string;
}
