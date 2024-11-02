import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { HeadquarterService } from './headquarter.service';
import { CreateHeadquarterDto } from './dto/create-headquarter.dto';
import { UpdateHeadquarterDto } from './dto/update-headquarter.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/data/decorators/roles.decorator';

@ApiBearerAuth()
@ApiTags('headquarter')
@Controller('headquarter')
export class HeadquarterController {
  constructor(private readonly headquarterService: HeadquarterService) {}

  @Post()
  @Roles('admin')
  create(@Body() createHeadquarterDto: CreateHeadquarterDto) {
    return this.headquarterService.create(createHeadquarterDto);
  }

  @Get()
  @Roles('admin')
  findAll() {
    return this.headquarterService.findAll();
  }

  @Get(':id')
  @Roles('admin')
  findOne(@Param('id') id: string) {
    return this.headquarterService.findOne(id);
  }

  @Patch(':id')
  @Roles('admin')
  update(
    @Param('id') id: string,
    @Body() updateHeadquarterDto: UpdateHeadquarterDto,
  ) {
    return this.headquarterService.update(id, updateHeadquarterDto);
  }

  @Delete(':id')
  @Roles('admin')
  remove(@Param('id') id: string) {
    return this.headquarterService.remove(id);
  }
}
