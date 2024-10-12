import { Supplier } from 'src/Data/entities/supplier-entity/supplier.entity';
import { Headquarter } from 'src/Data/entities/headquarter-entity/headquarter.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Costumer } from '../costumer-entity/costumer.entity';

@Entity()
export class Company {
  @PrimaryGeneratedColumn('uuid')
  companyId: string;

  @Column({ type: 'varchar', unique: true })
  nit: string;

  @Column({ type: 'varchar', unique: true })
  name: string;

  @Column({ type: 'varchar' })
  address: string;

  @Column({ type: 'varchar', unique: true })
  phone: string;

  @Column({ type: 'varchar', unique: true })
  email: string;

  @OneToMany(() => Headquarter, (headquarters) => headquarters.company, {
    onDelete: 'SET NULL',
  })
  @JoinColumn()
  headquarters: Array<Headquarter>;

  @OneToMany(() => Supplier, (supplier) => supplier.company, {
    onDelete: 'SET NULL',
  })
  @JoinColumn()
  suppliers: Array<Supplier>;

  @OneToMany(() => Costumer, (costumer) => costumer.company, {
    onDelete: 'SET NULL',
  })
  @JoinColumn()
  costumers: Array<Costumer>;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @DeleteDateColumn({ type: 'timestamp' })
  deletedAt: Date;
}
