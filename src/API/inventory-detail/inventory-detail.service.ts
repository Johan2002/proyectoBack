import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { DataGateway } from 'src/shared/socket/socket.gateway';
import { DataSource, Repository } from 'typeorm';
import { Product } from 'src/Data/entities/product-entity/product.entity';
import {
  ICreateInventoryDetail,
  IinventoryDetail,
} from 'src/Data/interfaces/api/inventoryDetail-interface/inventoryDetail.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { InventoryDetail } from 'src/Data/entities/inventory-detail-entity/inventory-detail.entity';

@Injectable()
export class InventoryDetailService {
  @InjectRepository(InventoryDetail)
  private readonly inventoryDetailRepository: Repository<InventoryDetail>;

  constructor(
    private readonly dataSource: DataSource,
    private readonly dataGateway: DataGateway,
  ) {}
  async create(createInventoryDetail: ICreateInventoryDetail) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const inventoryDetails: InventoryDetail[] = [];

      for (const {
        productId,
        quantityFinal,
      } of createInventoryDetail.products) {
        const product = await queryRunner.manager.findOne(Product, {
          where: { productId },
        });
        if (!product) {
          throw new NotFoundException('Product not found.');
        }

        const quantityInicial = product.productAmount;

        const quantitySale = quantityInicial - quantityFinal;

        product.productAmount -= quantitySale;

        await queryRunner.manager.save(product);

        if (quantitySale < 0) {
          throw new ConflictException(
            'You cant sell more than you have in stock.',
          );
        }

        const inventoryDetail = this.inventoryDetailRepository.create({
          product,
          quantityInicial,
          quantityFinal,
          quantitySale,
        });
        inventoryDetails.push(inventoryDetail);
      }

      await queryRunner.commitTransaction();

      return this.inventoryDetailRepository.save(inventoryDetails);
    } catch (error) {
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
  }

  async findAll(): Promise<Array<IinventoryDetail>> {
    return await this.inventoryDetailRepository.find({
      relations: ['product'],
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} inventoryDetail`;
  }
}
