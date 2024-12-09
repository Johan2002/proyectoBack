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
import { Permissions } from 'src/Data/decorators/permission.decorator';
import { EPermission } from 'src/Data/constants/permission.enum';

@ApiBearerAuth()
@ApiTags('headquarter')
@Controller('headquarter')
export class HeadquarterController {
  constructor(private readonly headquarterService: HeadquarterService) {}

  @Post()
  @Permissions(EPermission.ADMIN_ALL)
  create(@Body() createHeadquarterDto: CreateHeadquarterDto) {
    return this.headquarterService.create(createHeadquarterDto);
  }

  @Get()
  @Permissions(EPermission.ADMIN_ALL)
  findAll() {
    return this.headquarterService.findAll();
  }

  @Get(':headquarterId')
  @Permissions(EPermission.ADMIN_ALL)
  findOne(@Param('headquarterId') headquarterId: string) {
    return this.headquarterService.findOne(headquarterId);
  }

  @Put(':headquarterId')
  @Permissions(EPermission.ADMIN_ALL)
  update(
    @Param('headquarterId') headquarterId: string,
    @Body() updateHeadquarterDto: UpdateHeadquarterDto,
  ) {
    return this.headquarterService.update(headquarterId, updateHeadquarterDto);
  }

  @Delete(':headquarterId')
  @Permissions(EPermission.ADMIN_ALL)
  remove(@Param('headquarterId') headquarterId: string) {
    return this.headquarterService.remove(headquarterId);
  }
}
