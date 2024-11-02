import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { SaleService } from './sale.service';
import { CreateSaleDto } from './dto/create-sale.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/data/decorators/roles.decorator';

@ApiBearerAuth()
@ApiTags('sale')
@Controller('sale')
export class SaleController {
  constructor(private readonly saleService: SaleService) {}

  @Post()
  @Roles('admin', 'employee')
  create(
    @Body() createSaleDto: CreateSaleDto,
    @Param('userId') userId: string,
  ) {
    return this.saleService.create(userId, createSaleDto);
  }

  @Get()
  @Roles('admin', 'employee')
  findAll() {
    return this.saleService.findAll();
  }

  @Get(':id')
  @Roles('admin', 'employee')
  findOne(@Param('id') id: string) {
    return this.saleService.findOne(id);
  }
}
