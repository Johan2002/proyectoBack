import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, IsInt, IsUUID, ValidateNested } from 'class-validator';

export class CreateInventoryDetailDto {
  @ApiProperty({ description: 'Cantidad final producto' })
  @IsInt()
  quantityFinal: number;

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
  quantityFinal: number;
}
