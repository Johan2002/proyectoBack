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
import { Employee } from '../employee-entity/employee.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  UserId: string;

  @Column({ type: 'varchar', unique: true})
  userName: string;

  @Column({ type: 'varchar' })
  password: string;

  @OneToOne(() => Employee, (employee) => employee.user)
  @JoinColumn()
  employee: Employee;

  @ManyToOne(() => Rol, (rol) => rol.user)
  rol: Rol;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @DeleteDateColumn({ type: 'timestamp' })
  deletedAt: Date;
}
