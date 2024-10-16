import { IsNotEmpty, IsString } from 'class-validator';

export class CreateHeadquarterDto {

  @IsString()
  @IsNotEmpty()
  name: string;
  
  @IsString()
  @IsNotEmpty()
  address: string;

  company: string;

}
