import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Public } from 'src/Data/decorators/public.decorator';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Permissions } from 'src/Data/decorators/permission.decorator';
import { EPermission } from 'src/Data/constants/permission.enum';

@ApiBearerAuth()
@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @Public()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  @Permissions(EPermission.ADMIN_ALL)
  findAll() {
    return this.userService.findAll();
  }

  @Get(':userId')
  @Permissions(EPermission.ADMIN_ALL)
  findOne(@Param('userId') userId: string) {
    return this.userService.findOne(userId);
  }

  @Put(':userId')
  @Permissions(EPermission.ADMIN_ALL)
  update(
    @Param('userId') userId: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.userService.update(userId, updateUserDto);
  }

  @Delete(':userId')
  @Permissions(EPermission.ADMIN_ALL)
  remove(@Param('userId') userId: string) {
    return this.userService.remove(userId);
  }
}
