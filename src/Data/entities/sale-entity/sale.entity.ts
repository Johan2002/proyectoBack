import {
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Employee } from '../employee-entity/employee.entity';
import { Product } from '../product-entity/product.entity';
import { Customer } from '../customer-entity/customer.entity';

@Entity()
export class Sale {
  @PrimaryGeneratedColumn('uuid')
  saleId: string;

  @ManyToOne(() => Employee, (employee) => employee.sales, { nullable: false })
  @JoinColumn()
  employee: Employee;

  @ManyToOne(() => Customer, (customer) => customer.sales, { nullable: false })
  @JoinColumn()
  customer: Customer;

  @ManyToOne(() => Product, (product) => product.sales, { nullable: false })
  @JoinColumn()
  products: Array<Product>;

  @CreateDateColumn({ type: 'timestamp' })
  date_sale: Date;
}
