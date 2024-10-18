import { UserService } from './../user/user.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { loginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}
  async login({ userEmail, userPassword }: loginDto) {
    const user = await this.userService.findOneByEmail(userEmail);
    if (!user) {
      throw new UnauthorizedException();
    }

    // Suponiendo que 'password' es la contraseña ingresada y 'user.password' es la contraseña almacenada
    const isPasswordValid = await bcrypt.compare(
      userPassword,
      user.userPassword,
    );
    if (!isPasswordValid) {
      throw new UnauthorizedException();
    }

    const payload = { email: user.userEmail };
    const token = await this.jwtService.signAsync(payload);

    return {
      email: user.userEmail,
      acces_token: token,
    };
  }
}
