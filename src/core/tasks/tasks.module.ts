import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { ScheduleModule } from '@nestjs/schedule';
import { PdfFile } from 'src/data/entities/pdf-entity/pdf.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from 'src/Data/entities/product-entity/product.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([PdfFile, Product]),
    ScheduleModule.forRoot(),
  ],
  controllers: [],
  providers: [TasksService],
})
export class TasksModule {}
