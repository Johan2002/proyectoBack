import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CompanyService } from './company.service';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/data/decorators/roles.decorator';

@ApiBearerAuth()
@ApiTags('company')
@Controller('company')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @Post()
  @Roles('admin')
  create(@Body() createCompanyDto: CreateCompanyDto) {
    return this.companyService.create(createCompanyDto);
  }

  @Get()
  @Roles('admin')
  findAll() {
    return this.companyService.findAll();
  }

  @Get(':id')
  @Roles('admin')
  findOne(@Param('id') id: string) {
    return this.companyService.findOne(id);
  }

  @Patch(':id')
  @Roles('admin')
  update(@Param('id') id: string, @Body() updateCompanyDto: UpdateCompanyDto) {
    return this.companyService.update(id, updateCompanyDto);
  }

  @Delete(':id')
  @Roles('admin')
  remove(@Param('id') id: string) {
    return this.companyService.remove(id);
  }
}
