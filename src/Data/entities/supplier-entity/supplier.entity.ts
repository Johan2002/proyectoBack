import { Company } from 'src/Data/entities/company-entity/company.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { Product } from '../product-entity/product.entity';

@Entity()
@Unique(['supplierNit', 'supplierName', 'supplierAddress', 'supplierPhone', 'supplierEmail', 'company'])
export class Supplier {
  @PrimaryGeneratedColumn('uuid')
  supplierId: string;

  @Column({ type: 'varchar', nullable: false, unique: true })
  supplierNit: string;

  @Column({ type: 'varchar', nullable: false, unique: true })
  supplierName: string;

  @Column({ type: 'varchar', nullable: false })
  supplierAddress: string;

  @Column({ type: 'varchar', nullable: false, unique: true })
  supplierPhone: string;

  @Column({ type: 'varchar', nullable: false, unique: true })
  supplierEmail: string;

  @ManyToOne(() => Company, (company) => company.suppliers, { nullable: false })
  company: Array<Company>;

  @OneToMany(() => Product, (product) => product.supplier, { nullable: false })
  @JoinColumn()
  products: Array<Product>;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;
}
