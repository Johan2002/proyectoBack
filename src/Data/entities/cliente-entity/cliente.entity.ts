import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { Empresa } from '../empresa-entity/empresa.entity';
import { Venta } from '../venta-entity/venta.entity';

@Entity()
@Unique(['nombre', 'cedula', 'telefono', 'correo', 'empresa'])
export class Cliente {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  cedula: string;

  @Column({ type: 'varchar' })
  nombre: string;

  @Column({ type: 'varchar' })
  direccion: string;

  @Column({ type: 'varchar' })
  telefono: string;

  @Column({ type: 'varchar' })
  correo: string;

  @ManyToOne(() => Empresa, (empresa) => empresa.clientes)
  empresa: Empresa;

  @OneToMany(() => Venta, (venta) => venta.cliente)
  ventas: Array<Venta>;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @DeleteDateColumn({ type: 'timestamp' })
  deletedAt: Date;
}
