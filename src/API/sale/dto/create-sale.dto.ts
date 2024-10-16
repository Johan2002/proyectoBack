import { IsArray, IsInt, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateSaleDto {
  @IsString()
  @IsNotEmpty()
  employee: string;

  @IsString()
  @IsNotEmpty()
  costumer: string;

  @IsArray()
  @IsNotEmpty()
  products: Array<string>;
}
