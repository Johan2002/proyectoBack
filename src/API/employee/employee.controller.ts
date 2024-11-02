import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/data/decorators/roles.decorator';

@ApiBearerAuth()
@ApiTags('employee')
@Controller('employee')
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}

  @Post()
  @Roles('admin')
  create(@Body() createEmployeeDto: CreateEmployeeDto) {
    return this.employeeService.create(createEmployeeDto);
  }

  @Get()
  @Roles('admin')
  findAll() {
    return this.employeeService.findAll();
  }

  @Get(':id')
  @Roles('admin')
  findOne(@Param('id') id: string) {
    return this.employeeService.findOne(id);
  }

  @Patch(':id')
  @Roles('admin')
  update(
    @Param('id') id: string,
    @Body() updateEmployeeDto: UpdateEmployeeDto,
  ) {
    return this.employeeService.update(id, updateEmployeeDto);
  }

  @Delete(':id')
  @Roles('admin')
  remove(@Param('id') id: string) {
    return this.employeeService.remove(id);
  }
}
