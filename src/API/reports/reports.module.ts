import { Module } from '@nestjs/common';
import { ReportsService } from './reports.service';
import { ReportsController } from './reports.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SaleView } from 'src/Data/entities/view/sale-view.entity';
import { PdfFile } from 'src/Data/entities/pdf-entity/pdf.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SaleView, PdfFile])],
  controllers: [ReportsController],
  providers: [ReportsService],
})
export class ReportsModule {}
