import { Supplier } from 'src/Data/entities/supplier-entity/supplier.entity';
import { Headquarter } from 'src/Data/entities/headquarter-entity/headquarter.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Costumer } from '../costumer-entity/costumer.entity';

@Entity()
export class Company {
  @PrimaryGeneratedColumn('uuid')
  CompanyId: string;

  @Column({ type: 'varchar', unique: true })
  nit: string;

  @Column({ type: 'varchar', unique: true })
  name: string;

  @Column({ type: 'varchar' })
  address: string;

  @Column({ type: 'varchar', unique: true })
  phone: string;

  @Column({ type: 'varchar' })
  email: string;

  @OneToMany(() => Headquarter, (headquarters) => headquarters.company)
  @JoinColumn()
  headquarters: Array<Headquarter>;

  @OneToMany(() => Supplier, (supplier) => supplier.company)
  @JoinColumn()
  suppliers: Array<Supplier>;

  @OneToMany(() => Costumer, (costumer) => costumer.company)
  @JoinColumn()
  costumers: Array<Costumer>;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @DeleteDateColumn({ type: 'timestamp' })
  deletedAt: Date;
}
