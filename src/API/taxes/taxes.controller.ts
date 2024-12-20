import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { TaxesService } from './taxes.service';
import { CreateTaxDto } from './dto/create-tax.dto';
import { UpdateTaxDto } from './dto/update-tax.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Permissions } from 'src/Data/decorators/permission.decorator';
import { EPermission } from 'src/Data/constants/permission.enum';

@ApiBearerAuth()
@ApiTags('taxes')
@Controller('taxes')
export class TaxesController {
  constructor(private readonly taxesService: TaxesService) {}

  @Post()
  @Permissions(EPermission.ADMIN_ALL)
  create(@Body() createTaxDto: CreateTaxDto) {
    return this.taxesService.create(createTaxDto);
  }

  @Get()
  @Permissions(EPermission.ADMIN_ALL)
  findAll() {
    return this.taxesService.findAll();
  }

  @Get(':taxId')
  @Permissions(EPermission.ADMIN_ALL)
  findOne(@Param('taxId') taxId: string) {
    return this.taxesService.findOne(taxId);
  }

  @Put(':taxId')
  @Permissions(EPermission.ADMIN_ALL)
  update(@Param('taxId') taxId: string, @Body() updateTaxDto: UpdateTaxDto) {
    return this.taxesService.update(taxId, updateTaxDto);
  }

  @Delete(':taxId')
  @Permissions(EPermission.ADMIN_ALL)
  remove(@Param('taxId') taxId: string) {
    return this.taxesService.remove(taxId);
  }
}
