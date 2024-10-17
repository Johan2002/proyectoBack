import { Sale } from '../sale-entity/sale.entity';
import { OneToMany, OneToOne } from 'typeorm';
import { Headquarter } from 'src/Data/entities/headquarter-entity/headquarter.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../user-entity/user.entity';

@Entity()
export class Employee {
  @PrimaryGeneratedColumn('uuid')
  employeeId: string;

  @Column({ type: 'varchar', nullable: false, unique: true })
  employeeIdentity: string;

  @Column({ type: 'varchar', nullable: false })
  employeeName: string;

  @Column({ type: 'varchar', nullable: false })
  employeeLastname: string;

  @Column({ type: 'varchar', nullable: false })
  employeeAddress: string;

  @Column({ type: 'varchar', nullable: false, unique: true })
  employeePhone: string;

  @Column({ type: 'varchar', nullable: false, unique: true })
  employeeEmail: string;

  @ManyToOne(() => Headquarter, (headquarter) => headquarter.employees, {
    nullable: false,
  })
  headquarter: Headquarter;

  @OneToMany(() => Sale, (sale) => sale.employee, { nullable: true })
  sales: Array<Sale>;

  @OneToOne(() => User, (user) => user.employee, { nullable: true })
  user: User;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;
}
