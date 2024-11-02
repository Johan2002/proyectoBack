import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { SupplierService } from './supplier.service';
import { CreateSupplierDto } from './dto/create-supplier.dto';
import { UpdateSupplierDto } from './dto/update-supplier.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/data/decorators/roles.decorator';

@ApiBearerAuth()
@ApiTags('supplier')
@Controller('supplier')
export class SupplierController {
  constructor(private readonly supplierService: SupplierService) {}

  @Post()
  @Roles('admin')
  create(@Body() createSupplierDto: CreateSupplierDto) {
    return this.supplierService.create(createSupplierDto);
  }

  @Get()
  @Roles('admin')
  findAll() {
    return this.supplierService.findAll();
  }

  @Get(':id')
  @Roles('admin')
  findOne(@Param('id') id: string) {
    return this.supplierService.findOne(id);
  }

  @Patch(':id')
  @Roles('admin')
  update(
    @Param('id') id: string,
    @Body() updateSupplierDto: UpdateSupplierDto,
  ) {
    return this.supplierService.update(id, updateSupplierDto);
  }

  @Delete(':id')
  @Roles('admin')
  remove(@Param('id') id: string) {
    return this.supplierService.remove(id);
  }
}
