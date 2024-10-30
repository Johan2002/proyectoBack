import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsInt,
  IsNotEmpty,
  IsString,
  IsUUID,
  Min,
  ValidateNested,
} from 'class-validator';

export class CreateSaleDto {
  @ApiProperty({ description: 'Metodo de pago de la venta' })
  @IsString()
  salePaymentMethod: string;

  @ApiProperty({ description: 'ID del Empleados' })
  @IsUUID()
  @IsNotEmpty()
  employeeId: string;

  @ApiProperty({ description: 'ID del Clientes' })
  @IsUUID()
  @IsNotEmpty()
  customerId: string;

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
