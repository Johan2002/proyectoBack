import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CostumerService } from './costumer.service';
import { CreateCustomerDto } from './dto/create-costumer.dto';
import { UpdateCostumerDto } from './dto/update-costumer.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('customer')
@Controller('customer')
export class CostumerController {
  constructor(private readonly costumerService: CostumerService) {}

  @Post()
  create(@Body() createCustomerDto: CreateCustomerDto) {
    return this.costumerService.create(createCustomerDto);
  }

  @Get()
  findAll() {
    return this.costumerService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.costumerService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCostumerDto: UpdateCostumerDto,
  ) {
    return this.costumerService.update(id, updateCostumerDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.costumerService.remove(id);
  }
}
