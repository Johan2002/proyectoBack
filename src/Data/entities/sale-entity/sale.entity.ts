import {
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { Employee } from '../employee-entity/employee.entity';
import { Costumer } from '../costumer-entity/costumer.entity';
import { Product } from '../product-entity/product.entity';

@Entity()
@Unique(['employee', 'costumer', 'products'])
export class Sale {
  @PrimaryGeneratedColumn('uuid')
  saleId: string;

  @ManyToOne(() => Employee, (employee) => employee.sales, {
    onDelete: 'SET NULL',
  })
  @JoinColumn()
  employee: Employee;

  @ManyToOne(() => Costumer, (costumer) => costumer.sales, {
    onDelete: 'SET NULL',
  })
  @JoinColumn()
  costumer: Costumer;

  @ManyToOne(() => Product, (product) => product.sales, {
    onDelete: 'SET NULL'
  })
  @JoinColumn()
  products: Array<Product>;

  @CreateDateColumn({ type: 'timestamp' })
  date_sale: Date;

  @DeleteDateColumn({ type: 'timestamp' })
  deletedAt: Date;
}
