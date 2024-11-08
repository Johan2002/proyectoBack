import { Module } from '@nestjs/common';
import { RolService } from './rol.service';
import { RolController } from './rol.controller';
import { Rol } from 'src/Data/entities/rol-entity/rol.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/Data/entities/user-entity/user.entity';
import { DataGateway } from 'src/shared/socket/socket.gateway';

@Module({
  imports: [TypeOrmModule.forFeature([Rol, User])],
  controllers: [RolController],
  providers: [RolService, DataGateway],
})
export class RolModule {}
