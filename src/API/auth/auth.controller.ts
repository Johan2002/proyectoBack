import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  Get,
  Request,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { loginDto } from './dto/login.dto';
import { Public } from 'src/Data/decorators/public.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Public()
  @Post('login')
  login(@Body() loginDto: loginDto) {
    return this.authService.login(loginDto);
  }

  @Get('profile')
  profile(@Request() req) {
    return req.user;
  }
}
