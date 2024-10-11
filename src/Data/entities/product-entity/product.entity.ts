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
import { Supplier } from '../supplier-entity/supplier.entity';
import { Sale } from '../sale-entity/sale.entity';

@Entity()
@Unique(['code', 'name'])
export class Product {
  @PrimaryGeneratedColumn('uuid')
  productId: string;

  @Column({ type: 'varchar' })
  code: string;

  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'numeric' })
  price: number;

  @Column({ type: 'int4' })
  amount: number;

  @Column({ type: 'varchar' })
  description: string;

  @ManyToOne(() => Supplier, (supplier) => supplier.products)
  supplier: Supplier;

  @OneToMany(() => Sale, (sale) => sale.product)
  sales: Array<Sale>;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @DeleteDateColumn({ type: 'timestamp' })
  deletedAt: Date;
}
