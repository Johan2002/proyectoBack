import {
  Column,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Rol } from '../rol-entity/rol.entity';

@Entity()
export class Permiso {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  name: string;

  @ManyToMany(() => Rol, (rol) => rol.permiso)
  rol: Array<Rol>;
}
