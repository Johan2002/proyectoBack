import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SaleDetail } from 'src/Data/entities/sale-details-entity/sale-details.entity';
import { DataSource, Repository } from 'typeorm';
import { Employee } from 'src/Data/entities/employee-entity/employee.entity';
import { Customer } from 'src/Data/entities/customer-entity/customer.entity';
import { Sale } from 'src/Data/entities/sale-entity/sale.entity';
import { ICreateSale } from 'src/Data/interfaces/api/sale-interface/sale.interface';
import { Product } from 'src/Data/entities/product-entity/product.entity';

@Injectable()
export class SaleDetailsService {
  constructor(
    @InjectRepository(SaleDetail)
    private readonly detailRepository: Repository<SaleDetail>,
    @InjectRepository(Sale)
    private readonly saleRepository: Repository<Sale>,
    @InjectRepository(Employee)
    private readonly employeeRepository: Repository<Employee>,
    @InjectRepository(Customer)
    private readonly customerRepository: Repository<Customer>,
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    private readonly dataSource: DataSource,
  ) {}
  async create(createSaleDetailDto: ICreateSale) {
    const { customerId, employeeId, products, salePaymentMethod } =
      createSaleDetailDto;

    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const customer = await this.customerRepository.findOne({
        where: { customerId },
      });

      const employee = await this.employeeRepository.findOne({
        where: { employeeId },
      });
      const sale = this.saleRepository.create({
        customer,
        employee,
        salePaymentMethod,
        saleTotalPrice: 0,
      });

      for (const productDto of products) {
        const { productId, quantity } = productDto;
        const product = await this.productRepository.findOne({
          where: { productId },
          loadEagerRelations: false,
          relations: { tax: true },
        });
        const existsSaleDetail = await this.detailRepository.findOne({
          where: { sale, product },
        });

        if (existsSaleDetail) {
          throw new BadRequestException('El producto ya existe en la venta');
        }

        const unitPrice = product.productUnitValue;

        const subtotal = unitPrice * quantity;

        let totalTaxes = 0;

        for (const tax of product.tax) {
          totalTaxes += subtotal * (tax.taxPorcentage / 100);
        }
        console.log(totalTaxes);

        sale.saleTotalPrice += subtotal + totalTaxes;

        product.productAmount -= quantity;

        await queryRunner.manager.save(product);

        const saleDetail = this.detailRepository.create({
          sale,
          product,
          quantity,
          unitPrice,
          subtotal,
          totalTaxes,
          total: subtotal + totalTaxes,
        });

        console.log('saleDetail :>> ', saleDetail);

        await queryRunner.manager.save(saleDetail);
      }
      await queryRunner.commitTransaction();
      return 'create';
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  async findAll() {
    const saleDetail = await this.detailRepository.find({
      relations: ['sale', 'product'],
    });
    return saleDetail;
  }

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
