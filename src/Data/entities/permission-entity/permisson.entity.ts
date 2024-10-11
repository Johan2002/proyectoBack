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

  @Column({ type: 'varchar' })
  name: string;

  @ManyToMany(() => Rol, (rol) => rol.permission)
  rol: Array<Rol>;
}
