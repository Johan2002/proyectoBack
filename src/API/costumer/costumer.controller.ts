import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { CostumerService } from './costumer.service';
import { CreateCustomerDto } from './dto/create-costumer.dto';
import { UpdateCostumerDto } from './dto/update-costumer.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Permission } from 'src/data/constants/permission.enum';
import { Permissions } from 'src/data/decorators/permission.decorator';

@ApiBearerAuth()
@ApiTags('customer')
@Controller('customer')
export class CostumerController {
  constructor(private readonly costumerService: CostumerService) {}

  @Post()
  @Permissions(Permission.ADMIN_ALL)
  create(@Body() createCustomerDto: CreateCustomerDto) {
    return this.costumerService.create(createCustomerDto);
  }

  @Get()
  @Permissions(Permission.ADMIN_ALL)
  findAll() {
    return this.costumerService.findAll();
  }

  @Get(':customerId')
  @Permissions(Permission.ADMIN_ALL)
  findOne(@Param('customerId') customerId: string) {
    return this.costumerService.findOne(customerId);
  }

  @Put(':customerId')
  @Permissions(Permission.ADMIN_ALL)
  update(
    @Param('customerId') customerId: string,
    @Body() updateCostumerDto: UpdateCostumerDto,
  ) {
    return this.costumerService.update(customerId, updateCostumerDto);
  }

  @Delete(':customerId')
  @Permissions(Permission.ADMIN_ALL)
  remove(@Param('customerId') customerId: string) {
    return this.costumerService.remove(customerId);
  }
}
