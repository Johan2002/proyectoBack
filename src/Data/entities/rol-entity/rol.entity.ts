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
@Unique(['rolName'])
export class Rol {
  @PrimaryGeneratedColumn('uuid')
  rolId: string;

  @Column({ type: 'varchar' })
  rolName: string;

  @Column({ type: 'varchar' })
  rolDescription: string;

  @Column({ type: 'boolean' })
  rolStatus: boolean;

  @OneToMany(() => User, (user) => user.rol, {
    onDelete: 'SET NULL',
  })
  user: Array<User>;

  @ManyToMany(() => Permission, (permission) => permission.rol, {
    onDelete: 'SET NULL',
  })
  @JoinTable({name: 'permission_rol'})
  permission: Array<Permission>;
}
