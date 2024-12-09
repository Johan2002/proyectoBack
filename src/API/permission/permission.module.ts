import { Module } from '@nestjs/common';
import { PermissionService } from './permission.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Permission } from 'src/Data/entities/permission-entity/permisson.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Permission])],
  controllers: [],
  providers: [PermissionService],
})
export class PermissionModule {}
