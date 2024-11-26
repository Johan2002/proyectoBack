import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { InventoryDetailService } from './inventory-detail.service';
import { CreateInventoryDetailDto } from './dto/create-inventory-detail.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('inventory-detail')
@Controller('inventory-detail')
export class InventoryDetailController {
  constructor(
    private readonly inventoryDetailService: InventoryDetailService,
  ) {}

  @Post()
  create(@Body() createInventoryDetailDto: CreateInventoryDetailDto) {
    return this.inventoryDetailService.create(createInventoryDetailDto);
  }

  @Get()
  findAll() {
    return this.inventoryDetailService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.inventoryDetailService.findOne(+id);
  }
}
