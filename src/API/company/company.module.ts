import { Module } from '@nestjs/common';
import { CompanyService } from './company.service';
import { CompanyController } from './company.controller';
import { Headquarter } from 'src/Data/entities/headquarter-entity/headquarter.entity';
import { Supplier } from 'src/Data/entities/supplier-entity/supplier.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Company } from 'src/Data/entities/company-entity/company.entity';
import { Customer } from 'src/Data/entities/customer-entity/customer.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Company, Headquarter, Supplier, Customer])],
  controllers: [CompanyController],
  providers: [CompanyService],
})
export class CompanyModule {}
