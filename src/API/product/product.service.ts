import { Injectable, NotFoundException } from '@nestjs/common';
import {
  ICreateProduct,
  IProduct,
  IUpdateProduct,
} from 'src/Data/interfaces/api/product-interface/product.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from 'src/Data/entities/product-entity/product.entity';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { DataGateway } from 'src/shared/socket/socket.gateway';

@Injectable()
export class ProductService {
  @InjectRepository(Product)
  private readonly productRepository: Repository<Product>;

  constructor(private readonly dataGateway: DataGateway) {}

  async create({ ...createProduct }: ICreateProduct): Promise<IProduct> {
    const { productId }: IProduct = await this.productRepository.save({
      ...createProduct,
    });

    const product = await this.productRepository.findOne({
      where: { productId },
    });

    this.dataGateway.emitData({ acction: 'product/create', data: product });

    return product;
  }

  async findAll(): Promise<Array<IProduct>> {
    return await this.productRepository.find();
  }

  async findOne(productId: string): Promise<IProduct> {
    const product = await this.productRepository.findOne({
      where: { productId },
    });

    if (!product) {
      throw new NotFoundException('Product not found.');
    }

    return product;
  }

  async update(
    productId: string,
    updateProduct: IUpdateProduct,
  ): Promise<IProduct> {
    const updateResult: UpdateResult = await this.productRepository.update(
      productId,
      { ...updateProduct },
    );

    if (!updateResult.affected)
      throw new NotFoundException('Product information could not be updated.');

    const product = await this.productRepository.findOne({
      where: { productId },
    });

    this.dataGateway.emitData({ acction: 'product/update', data: product });

    return product;
  }

  async remove(productId: string) {
    const deleteResult: DeleteResult =
      await this.productRepository.delete(productId);

    if (!deleteResult.affected)
      throw new NotFoundException('Product not found.');

    this.dataGateway.emitData({
      acction: 'product/delete',
      data: { productId },
    });

    return productId;
  }
}
