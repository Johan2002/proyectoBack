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
import { Company } from '../company-entity/company.entity';
import { Sale } from '../sale-entity/sale.entity';

@Entity()
@Unique(['customerIdentity', 'customerName', 'customerLastname', 'customerEmail', 'customerPhone', 'company'])
export class Customer {
  @PrimaryGeneratedColumn('uuid')
  customerId: string;

  @Column({ type: 'varchar', nullable: false, unique: true })
  customerIdentity: string;

  @Column({ type: 'varchar', nullable: false })
  customerName: string;

  @Column({ type: 'varchar', nullable: false })
  customerLastname: string;

  @Column({ type: 'varchar', nullable: false })
  customerAddress: string;

  @Column({ type: 'varchar', nullable: false, unique: true })
  customerPhone: string;

  @Column({ type: 'varchar', nullable: false, unique: true })
  customerEmail: string;

  @ManyToOne(() => Company, (company) => company.customers, { nullable: true })
  company: Company;

  @OneToMany(() => Sale, (sale) => sale.customer, { nullable: true })
  sales: Array<Sale>;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;
}
