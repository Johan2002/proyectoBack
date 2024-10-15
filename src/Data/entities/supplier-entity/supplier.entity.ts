import { Company } from 'src/Data/entities/company-entity/company.entity';
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
import { Product } from '../product-entity/product.entity';

@Entity()
@Unique(['name', 'phone', 'address', 'email', 'nit', 'company'])
export class Supplier {
  @PrimaryGeneratedColumn('uuid')
  supplierId: string;

  @Column({ type: 'varchar' })
  nit: string;

  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'varchar' })
  address: string;

  @Column({ type: 'varchar' })
  phone: string;

  @Column({ type: 'varchar' })
  email: string;

  @ManyToOne(() => Company, (company) => company.suppliers, {
    onDelete: 'SET NULL',
  })
  company: Array<Company>;

  @OneToMany(() => Product, (product) => product.supplier, {
    onDelete: 'SET NULL',
  })
  @JoinColumn()
  products: Array<Product>;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @DeleteDateColumn({ type: 'timestamp' })
  deletedAt: Date;
}
