import { BadRequestException, Injectable } from '@nestjs/common';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Employee } from 'src/Data/entities/employee-entity/employee.entity';
import { Repository } from 'typeorm';
import {
  ICreateEmployee,
  IEmployee,
} from 'src/Data/interfaces/api/employee-interface/employee.interface';

@Injectable()
export class EmployeeService {
  constructor(
    @InjectRepository(Employee)
    private readonly employeeRespository: Repository<Employee>,
  ) {}
  async create({
    headquarterId,
    ...createEmployee
  }: ICreateEmployee): Promise<IEmployee> {
    const { employeeId }: IEmployee = await this.employeeRespository.save({
      headquarter: { headquarterId },
      ...createEmployee,
    });

    const employee = await this.employeeRespository.findOne({
      where: { employeeId },
    });

    return employee;
  }

  async findAll(): Promise<Array<IEmployee>> {
    return await this.employeeRespository.find({
      relations: ['headquarter', 'sales', 'user'],
    });
  }

  async findOne(id: string): Promise<IEmployee> {
    const employee = await this.employeeRespository.findOne({
      where: { employeeId: id },
      relations: ['headquarter', 'sales', 'user'],
    });
    if (!employee) {
      throw new BadRequestException('Employee not found.');
    }
    return employee;
  }

  async update(
    id: string,
    updateEmployeeDto: UpdateEmployeeDto,
  ): Promise<IEmployee> {
    const employee = await this.employeeRespository.findOne({
      where: { employeeId: id },
    });
    if (!employee) {
      throw new BadRequestException('Employee not found.');
    }

    Object.assign(employee, updateEmployeeDto);

    return this.employeeRespository.save(employee);
  }

  async remove(id: string) {
    await this.findOne(id);
    return await this.employeeRespository.delete(id);
  }
}
