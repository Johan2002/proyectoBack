import { Employee } from './../../Data/entities/employee-entity/employee.entity';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateSaleDto } from './dto/create-sale.dto';
import { UpdateSaleDto } from './dto/update-sale.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Sale } from 'src/Data/entities/sale-entity/sale.entity';
import { Repository } from 'typeorm';
import {
  ICreateSale,
  ISale,
} from 'src/Data/interfaces/api/sale-interface/sale.interface';
import { Customer } from 'src/Data/entities/customer-entity/customer.entity';

@Injectable()
export class SaleService {
  constructor(
    @InjectRepository(Sale)
    private readonly saleRepository: Repository<Sale>,
    @InjectRepository(Employee)
    private readonly employeeRepository: Repository<Employee>,
    @InjectRepository(Customer)
    private readonly costumerRepository: Repository<Customer>,
  ) {}
  async create({
    employeeId,
    customerId,
    ...createSale
  }: ICreateSale): Promise<ISale> {
    const { saleId }: ISale = await this.saleRepository.save({
      employee: { employeeId },
      customer: { customerId },
      ...createSale,
    });

    const sale = await this.saleRepository.findOne({ where: { saleId } });

    return sale;
  }

  async findAll(): Promise<Array<ISale>> {
    return await this.saleRepository.find({
      relations: ['employee', 'customer', 'products'],
    });
  }

  async findOne(id: string): Promise<ISale> {
    const sale = await this.saleRepository.findOne({
      where: { saleId: id },
      relations: ['employee', 'customer', 'products'],
    });
    if (!sale) {
      throw new BadRequestException('Sale not found.');
    }
    return sale;
  }

  async update(id: string, updateSaleDto: UpdateSaleDto): Promise<ISale> {
    const sale = await this.saleRepository.findOne({
      where: { saleId: id },
    });
    if (!sale) {
      throw new BadRequestException('Sale not found.');
    }
    Object.assign(sale, updateSaleDto);
    return this.saleRepository.save(sale);
  }

  async remove(id: string) {
    await this.findOne(id);
    return await this.saleRepository.softDelete(id);
  }
}
