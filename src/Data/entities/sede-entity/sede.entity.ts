import { Empresa } from '../empresa-entity/empresa.entity';
import { Empleado } from 'src/Data/entities/empleado-entity/empleado.entity';
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

@Entity()
export class Sede {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  nombre: string;

  @Column({ type: 'varchar' })
  direccion: string;

  @ManyToOne(() => Empresa, (empresa) => empresa.sedes)
  empresa: Empresa;

  @OneToMany(() => Empleado, (empleado) => empleado.sede)
  @JoinColumn()
  empleado: Empleado;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @DeleteDateColumn({ type: 'timestamp' })
  deletedAt: Date;
}
