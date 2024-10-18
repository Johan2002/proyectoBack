import { SupplierModule } from './supplier/supplier.module';
import { CostumerModule } from './costumer/costumer.module';
import { EmployeeModule } from './employee/employee.module';
import { HeadquarterModule } from './headquarter/headquarter.module';
import { CompanyModule } from './company/company.module';
import { UserModule } from './user/user.module';
import { Module } from '@nestjs/common';
import { ProductModule } from './product/product.module';
import { SaleModule } from './sale/sale.module';
import { PermissionModule } from './permission/permission.module';
import { RolModule } from './rol/rol.module';
import { ProductSaleModule } from './product-sale/product-sale.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    CompanyModule,
    EmployeeModule,
    CostumerModule,
    UserModule,
    SupplierModule,
    HeadquarterModule,
    ProductModule,
    SaleModule,
    PermissionModule,
    RolModule,
    AuthModule,
    ProductSaleModule,
  ],
})
export class ApiModule {}
