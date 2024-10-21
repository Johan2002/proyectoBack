import { IsNumber, IsString } from 'class-validator';

export class CreateSaleDetailDto {
  @IsNumber()
  quantity: number;

  @IsNumber()
  unitPrice: number;

  @IsNumber()
  subtotal: number;

  @IsNumber()
  total: number;

  @IsString()
  sale: string;

  @IsString()
  product: string;
}
