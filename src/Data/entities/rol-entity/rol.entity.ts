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

  @Column({ type: 'varchar', nullable: false, unique: true })
  rolName: string;

  @Column({ type: 'varchar', nullable: false })
  rolDescription: string;

  @Column({ type: 'boolean' })
  rolStatus: boolean;

  @OneToMany(() => User, (user) => user.rol, { nullable: true })
  user: Array<User>;

  @ManyToMany(() => Permission, (permission) => permission.rol, { nullable: false })
  @JoinTable({name: 'permission_rol'})
  permission: Array<Permission>;
}
