import { Module } from '@nestjs/common';
import { SupplierService } from './supplier.service';
import { SupplierController } from './supplier.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Supplier } from 'src/Data/entities/supplier-entity/supplier.entity';
import { Company } from 'src/Data/entities/company-entity/company.entity';
import { DataGateway } from 'src/shared/socket/socket.gateway';

@Module({
  imports: [TypeOrmModule.forFeature([Supplier, Company])],
  controllers: [SupplierController],
  providers: [SupplierService, DataGateway],
})
export class SupplierModule {}
