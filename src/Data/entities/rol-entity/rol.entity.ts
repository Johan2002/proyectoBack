import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { User } from '../user-entity/user.entity';
import { Permission } from '../permission-entity/permisson.entity';

@Entity()
@Unique(['name'])
export class Rol {
  @PrimaryGeneratedColumn('uuid')
  rolId: string;

  @Column({ type: 'varchar' })
  name: string;

  @OneToMany(() => User, (user) => user.rol)
  user: Array<User>;

  @ManyToMany(() => Permission, (permission) => permission.rol)
  @JoinTable({name: 'permission_rol'})
  permission: Array<Permission>;
}
