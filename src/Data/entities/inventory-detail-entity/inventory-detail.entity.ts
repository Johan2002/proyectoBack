import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
} from 'typeorm';
import { Product } from '../product-entity/product.entity';

@Entity()
export class InventoryDetail {
  @PrimaryGeneratedColumn('uuid')
  inventoryDetailId: string;

  @ManyToOne(() => Product)
  product: Product;

  @Column({ type: 'int4' })
  quantityInicial: number;

  @Column({ type: 'int4' })
  quantityFinal: number;

  @Column({ type: 'int4' })
  quantitySale: number;

  @CreateDateColumn({ type: 'timestamp' })
  inventoryDate: Date;
}
