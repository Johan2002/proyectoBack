import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { IProduct } from 'src/Data/interfaces/api/product-interface/product.interface';

export class CreateSaleDetailDto {
  @IsNumber()
  @IsNotEmpty()
  quantity: number;

  @IsNumber()
  @IsNotEmpty()
  unitPrice: number;

  @IsString()
  @IsNotEmpty()
  sale: string;

  product: Array<IProduct>;
}
