import { Supplier } from 'src/Data/entities/supplier-entity/supplier.entity';
import { Headquarter } from 'src/Data/entities/headquarter-entity/headquarter.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Customer } from '../customer-entity/customer.entity';

@Entity()
export class Company {
  @PrimaryGeneratedColumn('uuid')
  companyId: string;

  @Column({ type: 'varchar', nullable: false, unique: true })
  companyNit: string;

  @Column({ type: 'varchar', nullable: false, unique: true })
  companyName: string;

  @Column({ type: 'varchar', nullable: false, unique: true })
  companyAddress: string;

  @Column({ type: 'varchar', nullable: false, unique: true })
  companyPhone: string;

  @Column({ type: 'varchar', nullable: false, unique: true })
  companyEmail: string;

  @OneToMany(() => Headquarter, (headquarters) => headquarters.company, {
    nullable: false,
  })
  headquarters: Array<Headquarter>;

  @OneToMany(() => Supplier, (supplier) => supplier.company, {
    nullable: false,
  })
  @JoinColumn()
  suppliers: Array<Supplier>;

  @OneToMany(() => Customer, (customer) => customer.company, { nullable: true })
  @JoinColumn()
  customers: Array<Customer>;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;
}
