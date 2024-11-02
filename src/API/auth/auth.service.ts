import { UserService } from './../user/user.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { IAuth } from 'src/Data/interfaces/api/auth-interface/auth.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}
  async login({ userEmail, userPassword }: IAuth) {
    const user = await this.userService.findOneByEmail(userEmail);
    if (!user) {
      throw new UnauthorizedException('Please verify credentials.');
    }

    const isPasswordValid = await bcrypt.compare(
      userPassword,
      user.userPassword,
    );
    if (!isPasswordValid) {
      throw new UnauthorizedException('Please verify credentials.');
    }

    const payload = {
      email: user.userEmail,
      sub: user.userId,
      rol: user.rol.rolName,
    };
    const token = await this.jwtService.signAsync(payload);

    return {
      email: user.userEmail,
      sub: user.userId,
      rol: user.rol.rolName,
      acces_token: token,
    };
  }
}
