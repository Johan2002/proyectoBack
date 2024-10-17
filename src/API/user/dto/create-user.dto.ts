import { Transform } from 'class-transformer';
import { IsNotEmpty, IsString, IsUUID } from 'class-validator';
import { IEmployee } from 'src/Data/interfaces/api/employee-interface/employee.interface';
import { IRol } from 'src/Data/interfaces/api/rol-interfaces/rol.interface';

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
