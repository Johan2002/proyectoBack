import { Module } from '@nestjs/common';
import { CompanyModule } from './empresa/company.module';
import { HeadquarterModule } from './sede/headquarter.module';
import { EmployeeModule } from './empleado/employee.module';
import { CostumerModule } from './cliente/costumer.module';
import { SupplierModule } from './proveedor/supplier.module';
import { UserModule } from './usuario/user.module';

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
