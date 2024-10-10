import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { Rol } from '../rol-entity/rol.entity';
import { Empleado } from '../empleado-entity/empleado.entity';

@Entity()
@Unique(['nombre'])
export class Usuario {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  nombre: string;

  @Column({ type: 'varchar' })
  contraseña: string;

  @OneToOne(() => Empleado, (empleado) => empleado.usuario)
  @JoinColumn()
  empleado: Empleado;

  @ManyToOne(() => Rol, (rol) => rol.usuario)
  rol: Rol;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @DeleteDateColumn({ type: 'timestamp' })
  deletedAt: Date;
}
