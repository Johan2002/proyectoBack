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
import { Permissions } from 'src/Data/decorators/permission.decorator';
import { EPermission } from 'src/Data/constants/permission.enum';

@ApiBearerAuth()
@ApiTags('company')
@Controller('company')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @Post()
  @Permissions(EPermission.ADMIN_ALL)
  create(@Body() createCompanyDto: CreateCompanyDto) {
    return this.companyService.create(createCompanyDto);
  }

  @Get()
  @Permissions(EPermission.ADMIN_ALL)
  findAll() {
    return this.companyService.findAll();
  }

  @Get(':companyId')
  @Permissions(EPermission.ADMIN_ALL)
  findOne(@Param('companyId') companyId: string) {
    return this.companyService.findOne(companyId);
  }

  @Put(':companyId')
  @Permissions(EPermission.ADMIN_ALL)
  update(
    @Param('companyId') companyId: string,
    @Body() updateCompanyDto: UpdateCompanyDto,
  ) {
    return this.companyService.update(companyId, updateCompanyDto);
  }

  @Delete(':companyId')
  @Permissions(EPermission.ADMIN_ALL)
  remove(@Param('companyId') companyId: string) {
    return this.companyService.remove(companyId);
  }
}
