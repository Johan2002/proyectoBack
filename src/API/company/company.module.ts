import { Module } from '@nestjs/common';
import { CompanyService } from './company.service';
import { CompanyController } from './company.controller';
import { Headquarter } from 'src/Data/entities/headquarter-entity/headquarter.entity';
import { Supplier } from 'src/Data/entities/supplier-entity/supplier.entity';
import { Costumer } from 'src/Data/entities/costumer-entity/costumer.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Company } from 'src/Data/entities/company-entity/company.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Company, Headquarter, Supplier, Costumer])],
  controllers: [CompanyController],
  providers: [CompanyService],
})
export class CompanyModule {}
