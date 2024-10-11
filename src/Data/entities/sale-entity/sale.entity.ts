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
import { Employee } from '../employee-entity/employee.entity';
import { Costumer } from '../costumer-entity/costumer.entity';
import { Product } from '../product-entity/product.entity';

@Entity()
@Unique(['employee', 'costumer', 'product'])
export class Sale {
  @PrimaryGeneratedColumn('uuid')
  saleId: string;

  @Column({ type: 'numeric' })
  amount: number;

  @Column({ type: 'numeric' })
  price: number;

  @CreateDateColumn({ type: 'timestamp' })
  date_sale: Date;

  @ManyToOne(() => Employee, (employee) => employee.sales)
  @JoinColumn()
  employee: Employee;

  @ManyToOne(() => Costumer, (costumer) => costumer.sales)
  @JoinColumn()
  costumer: Costumer;

  @ManyToOne(() => Product, (product) => product.sales)
  @JoinColumn()
  product: Product;

  @DeleteDateColumn({ type: 'timestamp' })
  deletedAt: Date;
}
