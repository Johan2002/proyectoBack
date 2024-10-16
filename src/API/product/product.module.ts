import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from 'src/Data/entities/product-entity/product.entity';
import { Supplier } from 'src/Data/entities/supplier-entity/supplier.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Product, Supplier])],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule {}
