import { Module } from '@nestjs/common';
import { InventoryDetailService } from './inventory-detail.service';
import { InventoryDetailController } from './inventory-detail.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InventoryDetail } from 'src/Data/entities/inventory-detail-entity/inventory-detail.entity';
import { DataGateway } from 'src/shared/socket/socket.gateway';
import { Product } from 'src/Data/entities/product-entity/product.entity';

@Module({
  imports: [TypeOrmModule.forFeature([InventoryDetail, Product])],
  controllers: [InventoryDetailController],
  providers: [InventoryDetailService, DataGateway],
})
export class InventoryDetailModule {}
