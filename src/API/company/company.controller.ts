import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { CompanyService } from './company.service';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Permission } from 'src/data/constants/permission.enum';
import { Permissions } from 'src/data/decorators/permission.decorator';

@ApiBearerAuth()
@ApiTags('company')
@Controller('company')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @Post()
  @Permissions(Permission.ADMIN_ALL)
  create(@Body() createCompanyDto: CreateCompanyDto) {
    return this.companyService.create(createCompanyDto);
  }

  @Get()
  @Permissions(Permission.ADMIN_ALL)
  findAll() {
    return this.companyService.findAll();
  }

  @Get(':companyId')
  @Permissions(Permission.ADMIN_ALL)
  findOne(@Param('companyId') companyId: string) {
    return this.companyService.findOne(companyId);
  }

  @Put(':companyId')
  @Permissions(Permission.ADMIN_ALL)
  update(
    @Param('companyId') companyId: string,
    @Body() updateCompanyDto: UpdateCompanyDto,
  ) {
    return this.companyService.update(companyId, updateCompanyDto);
  }

  @Delete(':companyId')
  @Permissions(Permission.ADMIN_ALL)
  remove(@Param('companyId') companyId: string) {
    return this.companyService.remove(companyId);
  }
}
