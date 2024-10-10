import { OneToMany, OneToOne } from 'typeorm';
import { Sede } from 'src/Data/entities/sede-entity/sede.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Venta } from '../venta-entity/venta.entity';
import { Usuario } from '../usuario-entity/usuario.entity';

@Entity()
export class Empleado {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', unique: true })
  cedula: string;

  @Column({ type: 'varchar' })
  nombre: string;

  @Column({ type: 'varchar' })
  direccion: string;

  @Column({ type: 'varchar', unique: true })
  telefono: string;

  @Column({ type: 'varchar', unique: true })
  correo: string;

  @ManyToOne(() => Sede, (sede) => sede.empleado)
  sede: Sede;
  
  @OneToMany(() => Venta, (venta) => venta.empleado)
  ventas: Array<Venta>;

  @OneToOne(() => Usuario, (usuario) => usuario.empleado)
  usuario: Usuario;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @DeleteDateColumn({ type: 'timestamp' })
  deletedAt: Date;
}
