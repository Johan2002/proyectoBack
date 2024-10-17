import { Module } from '@nestjs/common';
import { SaleService } from './sale.service';
import { SaleController } from './sale.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Sale } from 'src/Data/entities/sale-entity/sale.entity';
import { Employee } from 'src/Data/entities/employee-entity/employee.entity';
import { Product } from 'src/Data/entities/product-entity/product.entity';
import { Customer } from 'src/Data/entities/customer-entity/customer.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Sale, Employee, Customer, Product])],
  controllers: [SaleController],
  providers: [SaleService],
})
export class SaleModule {}
