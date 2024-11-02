import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Rol } from '../rol-entity/rol.entity';
import { Employee } from '../employee-entity/employee.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  userId: string;

  @Column({ type: 'varchar', nullable: false, unique: true })
  userName: string;

  @Column({ type: 'varchar', nullable: false, unique: true })
  userEmail: string;

  @Column({ type: 'varchar', nullable: false })
  userPassword: string;

  @OneToOne(() => Employee, (employee) => employee.user, { nullable: true })
  @JoinColumn()
  employee: Employee;

  @ManyToOne(() => Rol, (rol) => rol.user, {
    nullable: false,
  })
  rol: Rol;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;
}
