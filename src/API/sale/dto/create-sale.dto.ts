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
import { ICustomer } from 'src/Data/interfaces/api/costumer-interface/costumer.interface';
import { IEmployee } from 'src/Data/interfaces/api/employee-interface/employee.interface';

export class CreateSaleDto {
  @ApiProperty({ description: 'Precio total de la venta' })
  @IsNumber()
  saleTotalPrice: number;

  @ApiProperty({ description: 'Metodo de pago de la venta' })
  @IsString()
  salePaymentMethod: string;

  @ApiProperty({ description: 'ID del Empleados' })
  @IsUUID()
  @IsNotEmpty()
  employee: IEmployee;

  @ApiProperty({ description: 'ID del Clientes' })
  @IsUUID()
  @IsNotEmpty()
  customer: ICustomer;

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
