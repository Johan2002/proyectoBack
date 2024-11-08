import { DataGateway } from 'src/shared/socket/socket.gateway';
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
import { Headquarter } from 'src/Data/entities/headquarter-entity/headquarter.entity';

@Injectable()
export class SaleService {
  @InjectRepository(Sale)
  private readonly saleRepository: Repository<Sale>;
  @InjectRepository(SaleDetail)
  private readonly saleDetailRepository: Repository<SaleDetail>;

  constructor(
    private readonly dataSource: DataSource,
    private readonly dataGateway: DataGateway,
  ) {}

  async create(userId: string, createSale: ICreateSale) {
    const { customerId, headquarterId, products, salePaymentMethod } =
      createSale;

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
      const customer = await queryRunner.manager.findOne(Customer, {
        where: { customerId },
      });

      if (!customer) {
        throw new NotFoundException('Customer not found.');
      }

      const headquarter = await queryRunner.manager.findOne(Headquarter, {
        where: { headquarterId },
      });

      if (!headquarter) {
        throw new NotFoundException('Headquarter not found.');
      }

      const user = await queryRunner.manager.findOne(User, {
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

      const sale = queryRunner.manager.create(Sale, {
        saleDate: new Date(nowInColombia),
        salePaymentMethod,
        employee: user.employee,
        headquarter,
        customer,
        subtotal: 0,
        totalTaxes: 0,
      });

      await queryRunner.manager.save(sale);

      let saleTotalPrice = 0;

      for (const productDto of unifyProducts) {
        const { productId, quantity } = productDto;
        const product = await queryRunner.manager.findOne(Product, {
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

        await queryRunner.manager.save(product);

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
        console.log('saleDetail :>> ', saleDetail);
        await queryRunner.manager.save(saleDetail);

        sale.saleTotalPrice = saleTotalPrice;
        sale.subtotal += subtotal;
        sale.totalTaxes += totalTaxes;
      }
      await queryRunner.manager.save(sale);

      await queryRunner.commitTransaction();

      this.dataGateway.emitData({ acction: 'sale/create', data: sale });

      return sale;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  async findAll(): Promise<Array<ISale>> {
    return await this.saleRepository.find();
  }

  async findOne(saleId: string): Promise<ISale> {
    const sale = await this.saleRepository.findOne({
      where: { saleId },
    });

    if (!sale) {
      throw new BadRequestException('Sale not found.');
    }

    return sale;
  }
}
