import { IsNotEmpty, IsString } from 'class-validator';

export class CreateHeadquarterDto {

  @IsString()
  @IsNotEmpty()
  headquarterName: string;
  
  @IsString()
  @IsNotEmpty()
  headquarterAddress: string;

  @IsString()
  @IsNotEmpty()
  company: string;

}
