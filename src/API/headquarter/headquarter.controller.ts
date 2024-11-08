import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { HeadquarterService } from './headquarter.service';
import { CreateHeadquarterDto } from './dto/create-headquarter.dto';
import { UpdateHeadquarterDto } from './dto/update-headquarter.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Permission } from 'src/data/constants/permission.enum';
import { Permissions } from 'src/data/decorators/permission.decorator';

@ApiBearerAuth()
@ApiTags('headquarter')
@Controller('headquarter')
export class HeadquarterController {
  constructor(private readonly headquarterService: HeadquarterService) {}

  @Post()
  @Permissions(Permission.ADMIN_ALL)
  create(@Body() createHeadquarterDto: CreateHeadquarterDto) {
    return this.headquarterService.create(createHeadquarterDto);
  }

  @Get()
  @Permissions(Permission.ADMIN_ALL)
  findAll() {
    return this.headquarterService.findAll();
  }

  @Get(':headquarterId')
  @Permissions(Permission.ADMIN_ALL)
  findOne(@Param('headquarterId') headquarterId: string) {
    return this.headquarterService.findOne(headquarterId);
  }

  @Put(':headquarterId')
  @Permissions(Permission.ADMIN_ALL)
  update(
    @Param('headquarterId') headquarterId: string,
    @Body() updateHeadquarterDto: UpdateHeadquarterDto,
  ) {
    return this.headquarterService.update(headquarterId, updateHeadquarterDto);
  }

  @Delete(':headquarterId')
  @Permissions(Permission.ADMIN_ALL)
  remove(@Param('headquarterId') headquarterId: string) {
    return this.headquarterService.remove(headquarterId);
  }
}
