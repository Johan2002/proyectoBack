import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Sale } from '../sale-entity/sale.entity';
import { Product } from '../product-entity/product.entity';

@Entity()
export class SaleDetail {
  @PrimaryGeneratedColumn('uuid')
  saleDetailId: string;

  @Column()
  quantity: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  unitPrice: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  subtotal: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  total: number;

  @ManyToOne(() => Sale, (sale) => sale.saleDetails)
  @JoinColumn()
  sale: Sale;

  @ManyToOne(() => Product)
  product: Product;
}