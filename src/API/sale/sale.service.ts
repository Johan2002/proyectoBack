import { SaleDetail } from './../../data/entities/sale-details-entity/sale-details.entity';
import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Sale } from 'src/Data/entities/sale-entity/sale.entity';
import { DataSource, Repository } from 'typeorm';
import { Customer } from 'src/Data/entities/customer-entity/customer.entity';
import { Product } from 'src/Data/entities/product-entity/product.entity';
import {
  ICreateSale,
  ISale,
} from 'src/Data/interfaces/api/sale-interface/sale.interface';
import { User } from 'src/Data/entities/user-entity/user.entity';
import { formatInTimeZone } from 'date-fns-tz';
import { Company } from 'src/Data/entities/company-entity/company.entity';

@Injectable()
export class SaleService {
  constructor(
    @InjectRepository(Sale)
    private readonly saleRepository: Repository<Sale>,
    @InjectRepository(Customer)
    private readonly customerRepository: Repository<Customer>,
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    @InjectRepository(SaleDetail)
    private readonly saleDetailRepository: Repository<SaleDetail>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Company)
    private readonly companyRepository: Repository<Company>,
    private readonly dataSource: DataSource,
  ) {}
  async create(userId: string, createSale: ICreateSale) {
    const { customerId, companyId, products, salePaymentMethod } = createSale;

    const productMap = new Map<
      string,
      { productId: string; quantity: number }
    >();
    products.forEach(({ productId, quantity }) => {
      if (productMap.has(productId)) {
        productMap.get(productId)!.quantity += quantity;
      } else {
        productMap.set(productId, { productId, quantity });
      }
    });
    const unifyProducts = Array.from(productMap.values());

    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const customer = await this.customerRepository.findOne({
        where: { customerId },
      });

      if (!customer) {
        throw new NotFoundException('Customer not found.');
      }

      const company = await this.companyRepository.findOne({
        where: { companyId },
      });

      if (!company) {
        throw new NotFoundException('Company not found.');
      }

      const user = await this.userRepository.findOne({
        where: { userId },
        relations: { employee: true },
      });

      if (!user) {
        throw new NotFoundException('User not found.');
      }

      const now = new Date();
      const nowInColombia = formatInTimeZone(
        now,
        'America/Bogota',
        'yyyy-MM-dd HH:mm:ss.SSSXXX',
      );

      const sale = this.saleRepository.create({
        saleDate: new Date(nowInColombia),
        salePaymentMethod,
        employee: user.employee,
        company,
        customer,
        subtotal: 0,
        totalTaxes: 0,
      });

      await queryRunner.manager.save(sale);

      let saleTotalPrice = 0;

      for (const productDto of unifyProducts) {
        const { productId, quantity } = productDto;
        const product = await this.productRepository.findOne({
          where: { productId },
          relations: { tax: true },
        });
        if (!product) {
          throw new NotFoundException('Product not found.');
        }

        if (product.productAmount < quantity) {
          throw new ConflictException(
            `Insufficient stock, only ${product.productAmount} `,
          );
        }

        const unitPrice = product.productPrice;

        const subtotal = unitPrice * quantity;

        let totalTaxes = 0;
        product.tax.forEach((tax) => {
          totalTaxes += (tax.taxPorcentage / 100) * subtotal;
        });

        const total = subtotal + totalTaxes;

        product.productAmount -= quantity;

        await this.productRepository.save(product);

        const saleDetail = this.saleDetailRepository.create({
          sale: sale,
          product: product,
          quantity: productDto.quantity,
          unitPrice: unitPrice,
          subtotal: subtotal,
          totalTaxes: totalTaxes,
          total: total,
        });

        saleTotalPrice += total;

        await queryRunner.manager.save(saleDetail);

        sale.saleTotalPrice = saleTotalPrice;
        sale.subtotal += subtotal;
        sale.totalTaxes += totalTaxes;
      }
      await queryRunner.manager.save(sale);

      await queryRunner.commitTransaction();

      return sale;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  async findAll(): Promise<Array<ISale>> {
    return await this.saleRepository.find({
      relations: ['employee', 'customer', 'company', 'saleDetails.product.tax'],
    });
  }

  async findOne(id: string): Promise<ISale> {
    const sale = await this.saleRepository.findOne({
      where: { saleId: id },
      relations: ['employee', 'customer', 'company', 'saleDetails'],
    });
    if (!sale) {
      throw new BadRequestException('Sale not found.');
    }
    return sale;
  }
}
