import { Module } from '@nestjs/common';
import { SaleDetailsService } from './sale-details.service';
import { SaleDetailsController } from './sale-details.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SaleDetail } from 'src/Data/entities/sale-details-entity/sale-details.entity';
import { Customer } from 'src/Data/entities/customer-entity/customer.entity';
import { Employee } from 'src/Data/entities/employee-entity/employee.entity';
import { Sale } from 'src/Data/entities/sale-entity/sale.entity';
import { Product } from 'src/Data/entities/product-entity/product.entity';
import { Company } from 'src/Data/entities/company-entity/company.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      SaleDetail,
      Sale,
      Employee,
      Customer,
      Company,
      Product,
    ]),
  ],
  controllers: [SaleDetailsController],
  providers: [SaleDetailsService],
})
export class SaleDetailsModule {}
