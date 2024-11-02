import { Module } from '@nestjs/common';
import { SaleService } from './sale.service';
import { SaleController } from './sale.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Sale } from 'src/Data/entities/sale-entity/sale.entity';
import { Employee } from 'src/Data/entities/employee-entity/employee.entity';
import { Product } from 'src/Data/entities/product-entity/product.entity';
import { Customer } from 'src/Data/entities/customer-entity/customer.entity';
import { SaleDetail } from 'src/Data/entities/sale-details-entity/sale-details.entity';
import { User } from 'src/Data/entities/user-entity/user.entity';
import { Company } from 'src/Data/entities/company-entity/company.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Sale,
      Employee,
      Customer,
      Company,
      Product,
      SaleDetail,
      User,
    ]),
  ],
  controllers: [SaleController],
  providers: [SaleService],
})
export class SaleModule {}
