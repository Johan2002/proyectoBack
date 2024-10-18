import { Module } from '@nestjs/common';
import { ProductSaleService } from './product-sale.service';
import { ProductSaleController } from './product-sale.controller';

@Module({
  controllers: [ProductSaleController],
  providers: [ProductSaleService],
})
export class ProductSaleModule {}
