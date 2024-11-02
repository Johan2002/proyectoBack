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
import { Company } from '../company-entity/company.entity';

@Entity()
export class Sale {
  @PrimaryGeneratedColumn('uuid')
  saleId: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  subtotal: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  totalTaxes: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
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

  @OneToMany(() => SaleDetail, (saleDetail) => saleDetail.sale, {
    cascade: true,
  })
  saleDetails: Array<SaleDetail>;

  @ManyToOne(() => Company, (company) => company.sales, { nullable: false })
  company: Company;
}
