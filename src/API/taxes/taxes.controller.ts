import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { TaxesService } from './taxes.service';
import { CreateTaxDto } from './dto/create-tax.dto';
import { UpdateTaxDto } from './dto/update-tax.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/data/decorators/roles.decorator';

@ApiBearerAuth()
@ApiTags('taxes')
@Controller('taxes')
export class TaxesController {
  constructor(private readonly taxesService: TaxesService) {}

  @Post()
  @Roles('admin')
  create(@Body() createTaxDto: CreateTaxDto) {
    return this.taxesService.create(createTaxDto);
  }

  @Get()
  @Roles('admin')
  findAll() {
    return this.taxesService.findAll();
  }

  @Get(':id')
  @Roles('admin')
  findOne(@Param('id') id: string) {
    return this.taxesService.findOne(id);
  }

  @Patch(':id')
  @Roles('admin')
  update(@Param('id') id: string, @Body() updateTaxDto: UpdateTaxDto) {
    return this.taxesService.update(id, updateTaxDto);
  }

  @Delete(':id')
  @Roles('admin')
  remove(@Param('id') id: string) {
    return this.taxesService.remove(id);
  }
}
