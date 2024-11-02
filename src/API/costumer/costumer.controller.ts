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
import { Roles } from 'src/data/decorators/roles.decorator';

@ApiBearerAuth()
@ApiTags('customer')
@Controller('customer')
export class CostumerController {
  constructor(private readonly costumerService: CostumerService) {}

  @Post()
  @Roles('admin', 'employee')
  create(@Body() createCustomerDto: CreateCustomerDto) {
    return this.costumerService.create(createCustomerDto);
  }

  @Get()
  @Roles('admin')
  findAll() {
    return this.costumerService.findAll();
  }

  @Get(':id')
  @Roles('admin')
  findOne(@Param('id') id: string) {
    return this.costumerService.findOne(id);
  }

  @Patch(':id')
  @Roles('admin')
  update(
    @Param('id') id: string,
    @Body() updateCostumerDto: UpdateCostumerDto,
  ) {
    return this.costumerService.update(id, updateCostumerDto);
  }

  @Delete(':id')
  @Roles('admin')
  remove(@Param('id') id: string) {
    return this.costumerService.remove(id);
  }
}
