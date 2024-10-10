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
import { Proveedor } from '../proveedor-entity/proveedor.entity';
import { Venta } from '../venta-entity/venta.entity';

@Entity()
@Unique(['codigo', 'nombre'])
export class Producto {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  codigo: string;

  @Column({ type: 'varchar' })
  nombre: string;

  @Column({ type: 'numeric' })
  precio: number;

  @Column({ type: 'int4' })
  unidades: number;

  @Column({ type: 'varchar' })
  descripcion: string;

  @ManyToOne(() => Proveedor, (proveedor) => proveedor.productos)
  proveedor: Proveedor;

  @OneToMany(() => Venta, (venta) => venta.producto)
  ventas: Array<Venta>;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @DeleteDateColumn({ type: 'timestamp' })
  deletedAt: Date;
}
