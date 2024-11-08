import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Employee } from 'src/Data/entities/employee-entity/employee.entity';
import { Repository, UpdateResult, DeleteResult } from 'typeorm';
import {
  ICreateEmployee,
  IEmployee,
  IUpdateEmployee,
} from 'src/Data/interfaces/api/employee-interface/employee.interface';
import { DataGateway } from 'src/shared/socket/socket.gateway';

@Injectable()
export class EmployeeService {
  @InjectRepository(Employee)
  private readonly employeeRespository: Repository<Employee>;

  constructor(private readonly dataGateway: DataGateway) {}

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

    this.dataGateway.emitData({
      acction: 'employee/create',
      data: employee,
    });

    return employee;
  }

  async findAll(): Promise<Array<IEmployee>> {
    return await this.employeeRespository.find();
  }

  async findOne(employeeId: string): Promise<IEmployee> {
    const employee = await this.employeeRespository.findOne({
      where: { employeeId },
    });

    if (!employee) {
      throw new BadRequestException('Employee not found.');
    }

    return employee;
  }

  async update(
    employeeId: string,
    updateEmployee: IUpdateEmployee,
  ): Promise<IEmployee> {
    const updateResult: UpdateResult = await this.employeeRespository.update(
      employeeId,
      { ...updateEmployee },
    );

    if (!updateResult.affected)
      throw new NotFoundException('Employee information could not be updated.');

    const employee: IEmployee = await this.employeeRespository.findOne({
      where: { employeeId },
    });

    this.dataGateway.emitData({
      acction: 'employee/update',
      data: employee,
    });

    return employee;
  }

  async remove(employeeId: string): Promise<string> {
    const deleteResult: DeleteResult =
      await this.employeeRespository.delete(employeeId);

    if (!deleteResult.affected)
      throw new NotFoundException('Employee not found.');

    this.dataGateway.emitData({
      acction: 'employee/delete',
      data: { employeeId },
    });

    return employeeId;
  }
}
