import { Injectable } from '@nestjs/common';
import { CreateProductSaleDto } from './dto/create-product-sale.dto';
import { UpdateProductSaleDto } from './dto/update-product-sale.dto';

@Injectable()
export class ProductSaleService {
  create(createProductSaleDto: CreateProductSaleDto) {
    return 'This action adds a new productSale';
  }

  findAll() {
    return `This action returns all productSale`;
  }

  findOne(id: number) {
    return `This action returns a #${id} productSale`;
  }

  update(id: number, updateProductSaleDto: UpdateProductSaleDto) {
    return `This action updates a #${id} productSale`;
  }

  remove(id: number) {
    return `This action removes a #${id} productSale`;
  }
}
