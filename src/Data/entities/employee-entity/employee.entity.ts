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

  @Column({ type: 'varchar', unique: true })
  identity: string;

  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'varchar' })
  lastname: string;

  @Column({ type: 'varchar' })
  address: string;

  @Column({ type: 'varchar', unique: true })
  phone: string;

  @Column({ type: 'varchar', unique: true })
  email: string;

  @ManyToOne(() => Headquarter, (headquarters) => headquarters.employee)
  headquarters: Headquarter;

  @OneToMany(() => Sale, (sale) => sale.employee)
  sales: Array<Sale>;

  @OneToOne(() => User, (user) => user.employee)
  user: User;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @DeleteDateColumn({ type: 'timestamp' })
  deletedAt: Date;
}