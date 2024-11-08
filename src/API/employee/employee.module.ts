import { Module } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { EmployeeController } from './employee.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Employee } from 'src/Data/entities/employee-entity/employee.entity';
import { Headquarter } from 'src/Data/entities/headquarter-entity/headquarter.entity';
import { DataGateway } from 'src/shared/socket/socket.gateway';

@Module({
  imports: [TypeOrmModule.forFeature([Employee, Headquarter])],
  controllers: [EmployeeController],
  providers: [EmployeeService, DataGateway],
})
export class EmployeeModule {}
