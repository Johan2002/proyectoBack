import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { ScheduleModule } from '@nestjs/schedule';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from 'src/Data/entities/product-entity/product.entity';
import { PdfFile } from 'src/Data/entities/pdf-entity/pdf.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([PdfFile, Product]),
    ScheduleModule.forRoot(),
  ],
  controllers: [],
  providers: [TasksService],
})
export class TasksModule {}
