import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Employee } from 'src/Data/entities/employee-entity/employee.entity';
import { Repository } from 'typeorm';
import { Headquarter } from 'src/Data/entities/headquarter-entity/headquarter.entity';
import { IEmployee } from 'src/Data/interfaces/api/employee-interface/employee.interface';

@Injectable()
export class EmployeeService {
  constructor(
    @InjectRepository(Employee)
    private readonly employeeRespository: Repository<Employee>,
    @InjectRepository(Headquarter)
    private readonly headquarterReposiroty: Repository<Headquarter>,
  ) {}
  async create(createEmployeeDto: CreateEmployeeDto): Promise<IEmployee> {
    const { headquarter: headquarterId, ...employeeData } = createEmployeeDto;
    let headquarter = null;

    if (headquarterId) {
      headquarter = await this.headquarterReposiroty.findOne({
        where: { headquarterId },
      });

      if (!headquarter) {
        throw new NotFoundException('The headquarters is not in the system.');
      }
    }

    const newEmployee = this.employeeRespository.create({
      headquarter,
      ...employeeData,
    });
    return this.employeeRespository.save(newEmployee);
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
