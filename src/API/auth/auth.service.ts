import { UserService } from './../user/user.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import {
  IAuth,
  IPayload,
} from 'src/Data/interfaces/api/auth-interface/auth.interface';

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

    const permissions: string[] =
      user?.rol?.permission?.map((permission) => permission.permissionName) ||
      [];

    delete user.userPassword;

    const payload: IPayload = {
      ...user,
      permissions,
    };
    console.log('payload :>> ', payload);
    const token = await this.jwtService.signAsync(payload);
    return {
      acces_token: token,
    };
  }
}
