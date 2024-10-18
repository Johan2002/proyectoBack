import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { HeadquarterService } from './headquarter.service';
import { CreateHeadquarterDto } from './dto/create-headquarter.dto';
import { UpdateHeadquarterDto } from './dto/update-headquarter.dto';

@Controller('headquarter')
export class HeadquarterController {
  constructor(private readonly headquarterService: HeadquarterService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createHeadquarterDto: CreateHeadquarterDto) {
    return this.headquarterService.create(createHeadquarterDto);
  }

  @Get()
  @HttpCode(HttpStatus.FOUND)
  findAll() {
    return this.headquarterService.findAll();
  }

  @Get(':id')
  @HttpCode(HttpStatus.FOUND)
  findOne(@Param('id') id: string) {
    return this.headquarterService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateHeadquarterDto: UpdateHeadquarterDto,
  ) {
    return this.headquarterService.update(id, updateHeadquarterDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.headquarterService.remove(id);
  }
}
