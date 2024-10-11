import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/Data/entities/user-entity/user.entity';
import { Employee } from 'src/Data/entities/employee-entity/employee.entity';
import { Rol } from 'src/Data/entities/rol-entity/rol.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Employee, Rol])],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
