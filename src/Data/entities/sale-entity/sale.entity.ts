import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Employee } from '../employee-entity/employee.entity';
import { Customer } from '../customer-entity/customer.entity';
import { SaleDetail } from '../sale-details-entity/sale-details.entity';

@Entity()
export class Sale {
  @PrimaryGeneratedColumn('uuid')
  saleId: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  saleTotalPrice: number;

  @Column()
  salePaymentMethod: string;

  @CreateDateColumn({ type: 'timestamp' })
  saleDate: Date;

  @ManyToOne(() => Employee, (employee) => employee.sales, { nullable: false })
  @JoinColumn()
  employee: Employee;

  @ManyToOne(() => Customer, (customer) => customer.sales, { nullable: false })
  @JoinColumn()
  customer: Customer;

  @OneToMany(() => SaleDetail, (saleDetail) => saleDetail.sale)
  saleDetails: Array<SaleDetail>;
}
