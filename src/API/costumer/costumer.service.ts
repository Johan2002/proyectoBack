import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import {
  ICreateCustomer,
  ICustomer,
  IUpdateCustomer,
} from 'src/Data/interfaces/api/costumer-interface/costumer.interface';
import { Customer } from 'src/Data/entities/customer-entity/customer.entity';
import { DataGateway } from 'src/shared/socket/socket.gateway';

@Injectable()
export class CostumerService {
  @InjectRepository(Customer)
  private readonly customerRepository: Repository<Customer>;

  constructor(private readonly dataGateway: DataGateway) {}

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

    this.dataGateway.emitData({ action: 'customer/create', data: customer });

    return customer;
  }

  async findAll(): Promise<Array<ICustomer>> {
    return await this.customerRepository.find();
  }

  async findOne(customerId: string): Promise<ICustomer> {
    const costumer = await this.customerRepository.findOne({
      where: { customerId },
    });

    if (!costumer) {
      throw new BadRequestException('Customer not found.');
    }

    return costumer;
  }

  async update(
    customerId: string,
    updateCostumer: IUpdateCustomer,
  ): Promise<ICustomer> {
    const updateResult: UpdateResult = await this.customerRepository.update(
      customerId,
      { ...updateCostumer },
    );

    if (!updateResult.affected)
      throw new NotFoundException('company information could not be updated.');

    const customer: ICustomer = await this.customerRepository.findOne({
      where: { customerId },
    });

    this.dataGateway.emitData({ action: 'customer/update', data: customer });

    return customer;
  }

  async remove(customerId: string): Promise<string> {
    const deleteResult: DeleteResult =
      await this.customerRepository.delete(customerId);

    if (!deleteResult.affected)
      throw new NotFoundException('Customer not fonud.');

    this.dataGateway.emitData({
      action: 'customer/delete',
      data: { customerId },
    });

    return customerId;
  }
}
