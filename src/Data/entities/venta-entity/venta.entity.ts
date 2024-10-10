import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { Empleado } from '../empleado-entity/empleado.entity';
import { Cliente } from '../cliente-entity/cliente.entity';
import { Producto } from '../producto-entity/producto.entity';

@Entity()
@Unique(['empleado', 'cliente', 'producto'])
export class Venta {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'numeric' })
  cantidad: number;

  @Column({ type: 'numeric' })
  valor: number;

  @CreateDateColumn({ type: 'timestamp' })
  fecha_venta: Date;

  @ManyToOne(() => Empleado, (empleado) => empleado.ventas)
  @JoinColumn()
  empleado: Empleado;

  @ManyToOne(() => Cliente, (cliente) => cliente.ventas)
  @JoinColumn()
  cliente: Cliente;

  @ManyToOne(() => Producto, (producto) => producto.ventas)
  @JoinColumn()
  producto: Producto;

  @DeleteDateColumn({ type: 'timestamp' })
  deletedAt: Date;
}
