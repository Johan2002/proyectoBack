import {
  IsArray,
  IsNotEmpty,
  IsString,
} from 'class-validator';

export class CreateSaleDto {
  @IsString()
  @IsNotEmpty()
  employee: string;

  @IsString()
  @IsNotEmpty()
  customer: string;

  @IsArray()
  @IsNotEmpty()
  products: Array<string>;
}
