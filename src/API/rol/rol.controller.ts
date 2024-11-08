import { Controller, Get, Post, Body, Param, Put } from '@nestjs/common';
import { RolService } from './rol.service';
import { CreateRolDto } from './dto/create-rol.dto';
import { UpdateRolDto } from './dto/update-rol.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Permission } from 'src/data/constants/permission.enum';
import { Permissions } from 'src/data/decorators/permission.decorator';

@ApiBearerAuth()
@ApiTags('rol')
@Controller('rol')
export class RolController {
  constructor(private readonly rolService: RolService) {}

  @Post()
  @Permissions(Permission.ADMIN_ALL)
  create(@Body() createRolDto: CreateRolDto) {
    return this.rolService.create(createRolDto);
  }

  @Get()
  @Permissions(Permission.ADMIN_ALL)
  findAll() {
    return this.rolService.findAll();
  }

  @Get(':rolId')
  @Permissions(Permission.ADMIN_ALL)
  findOne(@Param('rolId') rolId: string) {
    return this.rolService.findOne(rolId);
  }

  @Put(':rolId')
  @Permissions(Permission.ADMIN_ALL)
  update(@Param('rolId') rolId: string, @Body() updateRolDto: UpdateRolDto) {
    return this.rolService.update(rolId, updateRolDto);
  }
}
