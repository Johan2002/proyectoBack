import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { IProduct } from 'src/Data/interfaces/api/product-interface/product.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from 'src/Data/entities/product-entity/product.entity';
import { Repository } from 'typeorm';
import { Supplier } from 'src/Data/entities/supplier-entity/supplier.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    @InjectRepository(Supplier)
    private readonly supplierRepository: Repository<Supplier>,
  ) {}
  async create(createProductDto: CreateProductDto): Promise<IProduct> {
    const { supplier: supplierId, ...productData } = createProductDto;
    const supplier = await this.supplierRepository.findOne({
      where: { supplierId },
    });
    if (!supplier) {
      throw new NotFoundException('The supplier is not in the system.');
    }
    const newProduct = this.productRepository.create({
      supplier,
      ...productData,
    });
    return this.productRepository.save(newProduct);
  }

  async findAll(): Promise<Array<IProduct>> {
    return await this.productRepository.find({
      relations: ['supplier'],
    });
  }

  async findOne(id: string): Promise<IProduct> {
    const product = await this.productRepository.findOne({
      where: { productId: id },
      relations: ['supplier'],
    });
    if (!product) {
      throw new BadRequestException('Product not found.');
    }
    return product;
  }

  async update(
    id: string,
    updateProductDto: UpdateProductDto,
  ): Promise<IProduct> {
    const product = await this.productRepository.findOne({
      where: { productId: id },
    });
    if (!product) {
      throw new BadRequestException('Product not found.');
    }
    Object.assign(product, updateProductDto);
    return this.productRepository.save(product);
  }

  async remove(id: string) {
    await this.findOne(id);
    return await this.productRepository.delete(id);
  }
}