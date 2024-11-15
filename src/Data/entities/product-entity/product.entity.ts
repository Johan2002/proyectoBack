import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { Supplier } from '../supplier-entity/supplier.entity';
import { SaleDetail } from '../sale-details-entity/sale-details.entity';
import { Tax } from '../taxes-entity/taxes.entity';
import { Inventory } from '../inventory-entity/inventory.entity';

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

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: false })
  productUnitValue: number;

  @Column({ type: 'int4', nullable: false })
  productAmount: number;

  @Column({ type: 'varchar', nullable: true })
  productDescription: string;

  @ManyToOne(() => Supplier, (supplier) => supplier.products, {
    nullable: false,
  })
  supplier: Supplier;

  @OneToMany(() => Inventory, (inventory) => inventory.product)
  inventory: Inventory;

  @OneToMany(() => SaleDetail, (saleDetail) => saleDetail.product, {
    nullable: true,
  })
  saleDetails: Array<SaleDetail>;

  @ManyToMany(() => Tax, (tax) => tax.product)
  @JoinTable({ name: 'product_tax' })
  tax: Array<Tax>;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;
}
