import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UpdateCostumerDto } from './dto/update-costumer.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Company } from 'src/Data/entities/company-entity/company.entity';
import {
  ICreateCustomer,
  ICustomer,
} from 'src/Data/interfaces/api/costumer-interface/costumer.interface';
import { CreateCustomerDto } from './dto/create-costumer.dto';
import { Customer } from 'src/Data/entities/customer-entity/customer.entity';

@Injectable()
export class CostumerService {
  constructor(
    @InjectRepository(Customer)
    private readonly customerRepository: Repository<Customer>,
    @InjectRepository(Company)
    private readonly companyRepository: Repository<Company>,
  ) {}
  async create({
    companyId,
    ...createCustomer
  }: ICreateCustomer): Promise<ICustomer> {
    const { customerId }: ICustomer = await this.customerRepository.save({
      company: { companyId },
      ...createCustomer,
    });

    const customer = await this.customerRepository.findOne({
      where: { customerId },
    });

    return customer;
  }

  async findAll(): Promise<Array<ICustomer>> {
    return await this.customerRepository.find({
      relations: ['company', 'sales'],
    });
  }

  async findOne(id: string): Promise<ICustomer> {
    const costumer = await this.customerRepository.findOne({
      where: { customerId: id },
      relations: ['company', 'sales'],
    });
    if (!costumer) {
      throw new BadRequestException('Customer not found.');
    }
    return costumer;
  }

  async update(
    id: string,
    updateCostumerDto: UpdateCostumerDto,
  ): Promise<ICustomer> {
    const costumer = await this.customerRepository.findOne({
      where: { customerId: id },
    });
    if (!costumer) {
      throw new BadRequestException('Customer not found.');
    }

    Object.assign(costumer, updateCostumerDto);

    return this.customerRepository.save(costumer);
  }

  async remove(id: string) {
    await this.findOne(id);
    return await this.customerRepository.delete(id);
  }
}
