import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProductSaleService } from './product-sale.service';
import { CreateProductSaleDto } from './dto/create-product-sale.dto';
import { UpdateProductSaleDto } from './dto/update-product-sale.dto';

@Controller('product-sale')
export class ProductSaleController {
  constructor(private readonly productSaleService: ProductSaleService) {}

  @Post()
  create(@Body() createProductSaleDto: CreateProductSaleDto) {
    return this.productSaleService.create(createProductSaleDto);
  }

  @Get()
  findAll() {
    return this.productSaleService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productSaleService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductSaleDto: UpdateProductSaleDto) {
    return this.productSaleService.update(+id, updateProductSaleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productSaleService.remove(+id);
  }
}
