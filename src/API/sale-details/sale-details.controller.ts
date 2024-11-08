import { Controller, Get, Post, Body } from '@nestjs/common';
import { SaleDetailsService } from './sale-details.service';
import { CreateSaleDetailDto } from './dto/create-sale-detail.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('sale-details')
@Controller('sale-details')
export class SaleDetailsController {
  constructor(private readonly saleDetailsService: SaleDetailsService) {}

  @Post()
  create(@Body() createSaleDetailDto: CreateSaleDetailDto) {
    return this.saleDetailsService.create(createSaleDetailDto);
  }

  @Get()
  findAll() {
    return this.saleDetailsService.findAll();
  }
}
