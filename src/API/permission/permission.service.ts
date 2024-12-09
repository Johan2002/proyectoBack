import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EPermission } from 'src/Data/constants/permission.enum';
import { Permission } from 'src/Data/entities/permission-entity/permisson.entity';

@Injectable()
export class PermissionService implements OnModuleInit {
  private readonly logger: Logger = new Logger('PermissionService');

  constructor(
    @InjectRepository(Permission)
    private readonly permissionRepository: Repository<Permission>,
  ) {}

  async onModuleInit() {
    await this.syncPermissions();
  }

  async syncPermissions() {
    const enumPermissions = Object.values(EPermission);

    for (const perm of enumPermissions) {
      const existingPermission = await this.permissionRepository.findOne({
        where: { permissionName: perm },
      });
      if (!existingPermission) {
        const newPermission = this.permissionRepository.create({
          permissionName: perm,
        });
        await this.permissionRepository.save(newPermission);
        this.logger.log(`Added permission: ${perm}`);
      }
    }

    this.logger.log('Permissions synchronization completed.');
  }
}
