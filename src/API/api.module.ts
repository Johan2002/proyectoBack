import { Module } from '@nestjs/common';
import { EmpresaModule } from './empresa/empresa.module';
import { SedeModule } from './sede/sede.module';
import { EmpleadoModule } from './empleado/empleado.module';
import { ClienteModule } from './cliente/cliente.module';
import { ProveedorModule } from './proveedor/proveedor.module';

@Module({
  imports: [
    EmpresaModule,
    SedeModule,
    EmpleadoModule,
    ClienteModule,
    ProveedorModule,
  ],
})
export class ApiModule {}