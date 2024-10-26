import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsString,
  IsUUID,
  ValidateNested,
} from 'class-validator';
import { ISupplier } from 'src/Data/interfaces/api/supplier-interface/supplier.interface';

export class CreateProductDto {
  @ApiProperty({ description: 'Codigo del producto' })
  @IsString()
  @IsNotEmpty()
  productCode: string;

  @ApiProperty({ description: 'Nombre del producto' })
  @IsString()
  @IsNotEmpty()
  productName: string;

  @ApiProperty({ description: 'Precio del producto' })
  @IsNumber()
  @IsNotEmpty()
  productPrice: number;

  @ApiProperty({ description: 'Cantidad del producto' })
  @IsNumber()
  @IsNotEmpty()
  productAmount: number;

  @ApiProperty({ description: 'Precio unitario del producto' })
  @IsNumber()
  @IsNotEmpty()
  productUnitValue: number;

  @ApiProperty({ description: 'Descripccion del producto' })
  @IsString()
  @IsNotEmpty()
  productDescription: string;

  @ApiProperty({ description: 'ID del proveedor' })
  @IsUUID()
  @IsNotEmpty()
  supplier: ISupplier;

  @ApiProperty({ description: 'ID de los impuestos' })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateProductTaxDto)
  tax: Array<CreateProductTaxDto>;
}

export class CreateProductTaxDto {
  @IsString()
  taxId: string;
}
