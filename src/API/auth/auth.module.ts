import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from '../user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { JwtConfigAsync } from 'src/Data/auth-config/jwt.config';

@Module({
  imports: [
    UserModule,
    JwtModule.registerAsync({
      useClass: JwtConfigAsync,
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
