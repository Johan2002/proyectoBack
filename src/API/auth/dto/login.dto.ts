import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MinLength } from 'class-validator';

export class loginDto {
  @ApiProperty({ description: 'Email del usuario' })
  @IsEmail()
  userEmail: string;

  @ApiProperty({ description: 'Contraseña del usuario' })
  @IsString()
  @MinLength(6)
  userPassword: string;
}
