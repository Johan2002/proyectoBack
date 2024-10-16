import { UserService } from './../user/user.service';
import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { loginDto } from './dto/login.dto';
import { registerDto } from './dto/register.dto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}
  async register({ userName, email, password }: registerDto) {
    const user = await this.userService.findOneByEmail(email);
    if (user) {
      throw new BadRequestException('User exists.');
    }

    const hashpassword = await bcrypt.hash(password, 10);

    await this.userService.create({
      userName,
      email,
      password: hashpassword,
    });
    return;
  }

  async login({ email, password }: loginDto) {
    const user = await this.userService.findOneByEmail(email);
    if (!user) {
      throw new UnauthorizedException('Email invalido.');
    }

    // Suponiendo que 'password' es la contraseña ingresada y 'user.password' es la contraseña almacenada
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Contraseña incorrecta.');
    }
    console.log(isPasswordValid)
    

    const payload = { email: user.email };
    const token = await this.jwtService.signAsync(payload);

    return {
      token: token,
      email: user.email,
    };
  }
}
