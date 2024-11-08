import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Permission } from 'src/data/constants/permission.enum';
import { Permissions } from 'src/data/decorators/permission.decorator';

@ApiBearerAuth()
@ApiTags('product')
@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  @Permissions(Permission.ADMIN_ALL)
  create(@Body() createProductDto: CreateProductDto) {
    return this.productService.create(createProductDto);
  }

  @Get()
  @Permissions(Permission.ADMIN_ALL)
  findAll() {
    return this.productService.findAll();
  }

  @Get(':productId')
  @Permissions(Permission.ADMIN_ALL)
  findOne(@Param('productId') productId: string) {
    return this.productService.findOne(productId);
  }

  @Put(':productId')
  @Permissions(Permission.ADMIN_ALL)
  update(
    @Param('productId') productId: string,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    return this.productService.update(productId, updateProductDto);
  }

  @Delete(':productId')
  @Permissions(Permission.ADMIN_ALL)
  remove(@Param('productId') productId: string) {
    return this.productService.remove(productId);
  }
}
