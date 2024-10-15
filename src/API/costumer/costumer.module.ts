import { Module } from '@nestjs/common';
import { CostumerService } from './costumer.service';
import { CostumerController } from './costumer.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Costumer } from 'src/Data/entities/costumer-entity/costumer.entity';
import { Company } from 'src/Data/entities/company-entity/company.entity';
import { Sale } from 'src/Data/entities/sale-entity/sale.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Costumer,Company, Sale])],
  controllers: [CostumerController],
  providers: [CostumerService],
})
export class CostumerModule {}
