import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from 'src/Data/entities/product-entity/product.entity';
import { Supplier } from 'src/Data/entities/supplier-entity/supplier.entity';
import { DataGateway } from 'src/shared/socket/socket.gateway';

@Module({
  imports: [TypeOrmModule.forFeature([Product, Supplier])],
  controllers: [ProductController],
  providers: [ProductService, DataGateway],
})
export class ProductModule {}
