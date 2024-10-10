import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { Usuario } from '../usuario-entity/usuario.entity';
import { Permiso } from '../permiso-entity/permiso.entity';

@Entity()
@Unique(['nombre'])
export class Rol {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  nombre: string;

  @OneToMany(() => Usuario, (usuario) => usuario.rol)
  usuario: Array<Usuario>;

  @ManyToMany(() => Permiso, (permiso) => permiso.rol)
  @JoinTable({name: 'permiso_rol'})
  permiso: Array<Permiso>;
}
