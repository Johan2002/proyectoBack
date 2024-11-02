import { Module } from '@nestjs/common';
import { ReportsService } from './reports.service';
import { ReportsController } from './reports.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SaleView } from 'src/data/entities/view/sale-view.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SaleView])],
  controllers: [ReportsController],
  providers: [ReportsService],
})
export class ReportsModule {}
