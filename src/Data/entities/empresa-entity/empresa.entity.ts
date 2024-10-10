import { Proveedor } from 'src/Data/entities/proveedor-entity/proveedor.entity';
import { Sede } from 'src/Data/entities/sede-entity/sede.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Cliente } from '../cliente-entity/cliente.entity';

@Entity()
export class Empresa {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', unique: true })
  nit: string;

  @Column({ type: 'varchar', unique: true })
  nombre: string;

  @Column({ type: 'varchar' })
  direccion: string;

  @Column({ type: 'varchar', unique: true })
  telefono: string;

  @Column({ type: 'varchar' })
  correo: string;

  @OneToMany(() => Sede, (sede) => sede.empresa)
  @JoinColumn()
  sedes: Array<Sede>;

  @OneToMany(() => Proveedor, (proveedor) => proveedor.empresa)
  @JoinColumn()
  proveedores: Array<Proveedor>;

  @OneToMany(() => Cliente, (cliente) => cliente.empresa)
  @JoinColumn()
  clientes: Array<Cliente>;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @DeleteDateColumn({ type: 'timestamp' })
  deletedAt: Date;
}
