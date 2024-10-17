import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { Supplier } from '../supplier-entity/supplier.entity';
import { Sale } from '../sale-entity/sale.entity';

@Entity()
@Unique(['productCode', 'productName', 'supplier'])
export class Product {
  @PrimaryGeneratedColumn('uuid')
  productId: string;

  @Column({ type: 'varchar', nullable: false, unique: true })
  productCode: string;

  @Column({ type: 'varchar', nullable: false, unique: true })
  productName: string;

  @Column({ type: 'numeric', nullable: false })
  productPrice: number;

  @Column({ type: 'int4', nullable: false })
  productAmount: number;

  @Column({ type: 'varchar', nullable: true })
  productDescription: string;

  @ManyToOne(() => Supplier, (supplier) => supplier.products, {
    nullable: false,
  })
  supplier: Supplier;

  @OneToMany(() => Sale, (sale) => sale.products, { nullable: true })
  sales: Array<Sale>;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;
}
