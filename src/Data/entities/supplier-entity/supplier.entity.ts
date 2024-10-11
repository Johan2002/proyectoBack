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
@Unique(['name', 'phone', 'email', 'nit', 'company'])
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

  @ManyToOne(() => Company, (company) => company.suppliers)
  company: Company;

  @OneToMany(() => Product, (product) => product.supplier)
  @JoinColumn()
  products: Array<Product>;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @DeleteDateColumn({ type: 'timestamp' })
  deletedAt: Date;
}
