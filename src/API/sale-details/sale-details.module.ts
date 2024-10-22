import { Module } from '@nestjs/common';
import { SaleDetailsService } from './sale-details.service';
import { SaleDetailsController } from './sale-details.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SaleDetail } from 'src/Data/entities/sale-details-entity/sale-details.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SaleDetail])],
  controllers: [SaleDetailsController],
  providers: [SaleDetailsService],
})
export class SaleDetailsModule {}
