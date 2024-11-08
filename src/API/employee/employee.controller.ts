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
import { Permission } from 'src/data/constants/permission.enum';
import { Permissions } from 'src/data/decorators/permission.decorator';

@ApiBearerAuth()
@ApiTags('employee')
@Controller('employee')
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}

  @Post()
  @Permissions(Permission.ADMIN_ALL)
  create(@Body() createEmployeeDto: CreateEmployeeDto) {
    return this.employeeService.create(createEmployeeDto);
  }

  @Get()
  @Permissions(Permission.ADMIN_ALL)
  findAll() {
    return this.employeeService.findAll();
  }

  @Get(':employeeId')
  @Permissions(Permission.ADMIN_ALL)
  findOne(@Param('employeeId') employeeId: string) {
    return this.employeeService.findOne(employeeId);
  }

  @Put(':employeeId')
  @Permissions(Permission.ADMIN_ALL)
  update(
    @Param('employeeId') employeeId: string,
    @Body() updateEmployeeDto: UpdateEmployeeDto,
  ) {
    return this.employeeService.update(employeeId, updateEmployeeDto);
  }

  @Delete(':employeeId')
  @Permissions(Permission.ADMIN_ALL)
  remove(@Param('employeeId') employeeId: string) {
    return this.employeeService.remove(employeeId);
  }
}
