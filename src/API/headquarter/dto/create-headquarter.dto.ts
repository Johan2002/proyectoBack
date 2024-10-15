import { IsNotEmpty, IsString } from 'class-validator';

export class CreateHeadquarterDto {
  headquarterId: string;

  @IsString()
  @IsNotEmpty()
  name: string;
  
  @IsString()
  @IsNotEmpty()
  address: string;

  company: string;

}
