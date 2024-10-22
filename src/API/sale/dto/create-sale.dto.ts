import {
  IsNotEmpty,
  IsNumber,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { CreateSaleDetailDto } from 'src/API/sale-details/dto/create-sale-detail.dto';

export class CreateSaleDto {
  @IsNumber()
  subtotal: number;

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
