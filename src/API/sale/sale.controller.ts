import { Controller } from '@nestjs/common';
import { SaleService } from './sale.service';
// import { CreateSaleDto } from './dto/create-sale.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('sale')
@Controller('sale')
export class SaleController {
  constructor(private readonly saleService: SaleService) {}

  // @Post()
  // create(@Body() createSaleDto: CreateSaleDto) {
  //   return this.saleService.create(createSaleDto);
  // }

  // @Get()
  // findAll() {
  //   return this.saleService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.saleService.findOne(id);
  // }
}
