import {
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';

export class CreateSaleDto {
  @IsNumber()
  saleTotalPrice: number;

  @IsString()
  salePaymentMethod: string;

  @IsString()
  @IsNotEmpty()
  employee: string;

  @IsString()
  @IsNotEmpty()
  customer: string;
}
