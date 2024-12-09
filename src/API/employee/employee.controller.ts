import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Permissions } from 'src/Data/decorators/permission.decorator';
import { EPermission } from 'src/Data/constants/permission.enum';

@ApiBearerAuth()
@ApiTags('employee')
@Controller('employee')
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}

  @Post()
  @Permissions(EPermission.ADMIN_ALL)
  create(@Body() createEmployeeDto: CreateEmployeeDto) {
    return this.employeeService.create(createEmployeeDto);
  }

  @Get()
  @Permissions(EPermission.ADMIN_ALL)
  findAll() {
    return this.employeeService.findAll();
  }

  @Get(':employeeId')
  @Permissions(EPermission.ADMIN_ALL)
  findOne(@Param('employeeId') employeeId: string) {
    return this.employeeService.findOne(employeeId);
  }

  @Put(':employeeId')
  @Permissions(EPermission.ADMIN_ALL)
  update(
    @Param('employeeId') employeeId: string,
    @Body() updateEmployeeDto: UpdateEmployeeDto,
  ) {
    return this.employeeService.update(employeeId, updateEmployeeDto);
  }

  @Delete(':employeeId')
  @Permissions(EPermission.ADMIN_ALL)
  remove(@Param('employeeId') employeeId: string) {
    return this.employeeService.remove(employeeId);
  }
}
