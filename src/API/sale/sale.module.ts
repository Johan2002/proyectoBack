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
import { Headquarter } from 'src/Data/entities/headquarter-entity/headquarter.entity';
import { DataGateway } from 'src/shared/socket/socket.gateway';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Sale,
      Employee,
      Customer,
      Headquarter,
      Product,
      SaleDetail,
      User,
    ]),
  ],
  controllers: [SaleController],
  providers: [SaleService, DataGateway],
})
export class SaleModule {}
