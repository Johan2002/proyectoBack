import { SupplierModule } from './supplier/supplier.module';
import { CostumerModule } from './costumer/costumer.module';
import { EmployeeModule } from './employee/employee.module';
import { HeadquarterModule } from './headquarter/headquarter.module';
import { CompanyModule } from './company/company.module';
import { UserModule } from './user/user.module';
import { Module } from '@nestjs/common';
import { ProductModule } from './product/product.module';
import { SaleModule } from './sale/sale.module';
import { RolModule } from './rol/rol.module';
import { AuthModule } from './auth/auth.module';
import { SaleDetailsModule } from './sale-details/sale-details.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from 'src/Data/guards/auth.guard';
import { JwtModule } from '@nestjs/jwt';
import { TaxesModule } from './taxes/taxes.module';
import { ReportsModule } from './reports/reports.module';
import { PrinterModule } from './printer/printer.module';
import { RolesAndPermissionsGuard } from 'src/Data/guards/roles-permissions.guard';

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
    RolModule,
    AuthModule,
    SaleDetailsModule,
    JwtModule,
    TaxesModule,
    ReportsModule,
    PrinterModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesAndPermissionsGuard,
    },
  ],
})
export class ApiModule {}
