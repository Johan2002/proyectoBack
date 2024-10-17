import { Module } from '@nestjs/common';
import { CostumerService } from './costumer.service';
import { CostumerController } from './costumer.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Company } from 'src/Data/entities/company-entity/company.entity';
import { Sale } from 'src/Data/entities/sale-entity/sale.entity';
import { Customer } from 'src/Data/entities/customer-entity/customer.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Customer,Company, Sale])],
  controllers: [CostumerController],
  providers: [CostumerService],
})
export class CostumerModule {}
