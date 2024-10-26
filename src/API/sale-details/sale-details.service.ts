import { Injectable } from '@nestjs/common';
// import { UpdateSaleDetailDto } from './dto/update-sale-detail.dto';
// import {
//   ICreateSaleDetail,
//   ISaleDetail,
// } from 'src/Data/interfaces/api/sale-detail-interface/sale-detail.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { SaleDetail } from 'src/Data/entities/sale-details-entity/sale-details.entity';
import { Repository } from 'typeorm';
import { Employee } from 'src/Data/entities/employee-entity/employee.entity';
import { Customer } from 'src/Data/entities/customer-entity/customer.entity';
import { Sale } from 'src/Data/entities/sale-entity/sale.entity';

@Injectable()
export class SaleDetailsService {
  constructor(
    @InjectRepository(SaleDetail)
    private readonly detailRepository: Repository<SaleDetail>,
    @InjectRepository(Sale)
    private readonly employeeRepository: Repository<Sale>,
    @InjectRepository(Employee)
    private readonly customerRepository: Repository<Employee>,
    @InjectRepository(Customer)
    private readonly saleRepository: Repository<Customer>,
  ) {}
  // async create({
  //   saleId,
  //   productId,
  //   ...createDetail
  // }: ICreateSaleDetail): Promise<ISaleDetail> {
  //   const { saleDetailId }: ISaleDetail = await this.detailRepository.save({
  //     sale: { saleId },
  //     product: { productId },
  //     ...createDetail,
  //   });

  //   const saleDetail = await this.detailRepository.findOne({
  //     where: { saleDetailId },
  //   });
  //   return saleDetail;
  // }

  // findAll() {
  //   return `This action returns all saleDetails`;
  // }

  // findOne(id: number) {
  //   return `This action returns a #${id} saleDetail`;
  // }

  // update(id: number, updateSaleDetailDto: UpdateSaleDetailDto) {
  //   return `This action updates a #${id} saleDetail`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} saleDetail`;
  // }
}
