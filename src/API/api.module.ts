import { SupplierModule } from './supplier/supplier.module';
import { CostumerModule } from './costumer/costumer.module';
import { EmployeeModule } from './employee/employee.module';
import { HeadquarterModule } from './headquarter/headquarter.module';
import { CompanyModule } from './company/company.module';
import { UserModule } from './user/user.module';
import { Module } from '@nestjs/common';

@Module({
  imports: [
    CompanyModule,
    EmployeeModule,
    CostumerModule,
    UserModule,
    SupplierModule,
    HeadquarterModule,
  ],
})
export class ApiModule {}
