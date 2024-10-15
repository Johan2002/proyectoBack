import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { Company } from '../company-entity/company.entity';
import { Sale } from '../sale-entity/sale.entity';

@Entity()
@Unique(['name', 'identity', 'phone', 'email', 'company'])
export class Costumer {
  @PrimaryGeneratedColumn('uuid')
  costumerId: string;

  @Column({ type: 'varchar' })
  identity: string;

  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'varchar' })
  lastname: string;

  @Column({ type: 'varchar' })
  address: string;

  @Column({ type: 'varchar' })
  phone: string;

  @Column({ type: 'varchar' })
  email: string;

  @ManyToOne(() => Company, (company) => company.costumers, {
    onDelete: 'SET NULL',
    nullable: true,
  })
  company: Company;

  @OneToMany(() => Sale, (sale) => sale.costumer, {
    onDelete: 'SET NULL',
  })
  sales: Array<Sale>;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @DeleteDateColumn({ type: 'timestamp' })
  deletedAt: Date;
}
