import { Empresa } from 'src/Data/entities/empresa-entity/empresa.entity';
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
import { Producto } from '../producto-entity/producto.entity';

@Entity()
@Unique(['nombre', 'telefono', 'correo', 'nit', 'empresa'])
export class Proveedor {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  nit: string;

  @Column({ type: 'varchar' })
  nombre: string;

  @Column({ type: 'varchar' })
  direccion: string;

  @Column({ type: 'varchar' })
  telefono: string;

  @Column({ type: 'varchar' })
  correo: string;

  @ManyToOne(() => Empresa, (empresa) => empresa.proveedores)
  empresa: Empresa;

  @OneToMany(() => Producto, (producto) => producto.proveedor)
  @JoinColumn()
  productos: Array<Producto>;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @DeleteDateColumn({ type: 'timestamp' })
  deletedAt: Date;
}
