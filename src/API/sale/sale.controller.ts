import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { SaleService } from './sale.service';
import { CreateSaleDto } from './dto/create-sale.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Permission } from 'src/data/constants/permission.enum';
import { Permissions } from 'src/data/decorators/permission.decorator';

@ApiBearerAuth()
@ApiTags('sale')
@Controller('sale')
export class SaleController {
  constructor(private readonly saleService: SaleService) {}

  @Post()
  @Permissions(Permission.ADMIN_ALL)
  create(
    @Body() createSaleDto: CreateSaleDto,
    @Param('userId') userId: string,
  ) {
    return this.saleService.create(userId, createSaleDto);
  }

  @Get()
  @Permissions(Permission.ADMIN_ALL)
  findAll() {
    return this.saleService.findAll();
  }

  @Get(':saleId')
  @Permissions(Permission.ADMIN_ALL)
  findOne(@Param('saleId') saleId: string) {
    return this.saleService.findOne(saleId);
  }
}
