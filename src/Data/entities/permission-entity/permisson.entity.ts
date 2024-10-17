import {
  Column,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Rol } from '../rol-entity/rol.entity';

@Entity()
export class Permission {
  @PrimaryGeneratedColumn('uuid')
  permissionId: string;

  @Column({ type: 'varchar', nullable: false, unique: true })
  permissionName: string;

  @ManyToMany(() => Rol, (rol) => rol.permission, { nullable: false })
  rol: Array<Rol>;
}
