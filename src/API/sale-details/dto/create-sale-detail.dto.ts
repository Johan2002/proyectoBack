import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsString,
  IsUUID,
  Min,
  ValidateNested,
} from 'class-validator';

export class CreateSaleDetailDto {
  @ApiProperty({ description: 'Cantidad de productos' })
  @IsNumber()
  @IsNotEmpty()
  quantity: number;

  @ApiProperty({ description: 'Precio unitario de producto' })
  @IsNumber()
  @IsNotEmpty()
  unitPrice: number;

  subtotal: number;

  totalTaxes: number;

  total: number;

  @ApiProperty({ description: 'ID de la venta' })
  @IsString()
  @IsNotEmpty()
  sale: string;

  @ApiProperty({ description: 'IDs de productos' })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ProductQuantityDto)
  products: Array<ProductQuantityDto>;
}

export class ProductQuantityDto {
  @IsUUID()
  productId: string;

  @IsInt()
  @Min(1)
  quantity: number;
}
