import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus } from '@nestjs/common';
import { CostumerService } from './costumer.service';
import { CreateCustomerDto } from './dto/create-costumer.dto';
import { UpdateCostumerDto } from './dto/update-costumer.dto';

@Controller('customer')
export class CostumerController {
  constructor(private readonly costumerService: CostumerService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createCustomerDto: CreateCustomerDto) {
    return this.costumerService.create(createCustomerDto);
  }

  @Get()
  @HttpCode(HttpStatus.FOUND)
  findAll() {
    return this.costumerService.findAll();
  }

  @Get(':id')
  @HttpCode(HttpStatus.FOUND)
  findOne(@Param('id') id: string) {
    return this.costumerService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCostumerDto: UpdateCostumerDto) {
    return this.costumerService.update(id, updateCostumerDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.costumerService.remove(id);
  }
}
