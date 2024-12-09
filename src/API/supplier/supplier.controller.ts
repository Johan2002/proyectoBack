import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { SupplierService } from './supplier.service';
import { CreateSupplierDto } from './dto/create-supplier.dto';
import { UpdateSupplierDto } from './dto/update-supplier.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Permissions } from 'src/Data/decorators/permission.decorator';
import { EPermission } from 'src/Data/constants/permission.enum';

@ApiBearerAuth()
@ApiTags('supplier')
@Controller('supplier')
export class SupplierController {
  constructor(private readonly supplierService: SupplierService) {}

  @Post()
  @Permissions(EPermission.ADMIN_ALL)
  create(@Body() createSupplierDto: CreateSupplierDto) {
    return this.supplierService.create(createSupplierDto);
  }

  @Get()
  @Permissions(EPermission.ADMIN_ALL)
  findAll() {
    return this.supplierService.findAll();
  }

  @Get(':supplierId')
  @Permissions(EPermission.ADMIN_ALL)
  findOne(@Param('supplierId') supplierId: string) {
    return this.supplierService.findOne(supplierId);
  }

  @Put(':supplierId')
  @Permissions(EPermission.ADMIN_ALL)
  update(
    @Param('supplierId') supplierId: string,
    @Body() updateSupplierDto: UpdateSupplierDto,
  ) {
    return this.supplierService.update(supplierId, updateSupplierDto);
  }

  @Delete(':supplierId')
  @Permissions(EPermission.ADMIN_ALL)
  remove(@Param('supplierId') supplierId: string) {
    return this.supplierService.remove(supplierId);
  }
}
