import { Company } from '../company-entity/company.entity';
import { Employee } from 'src/Data/entities/employee-entity/employee.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Sale } from '../sale-entity/sale.entity';

@Entity()
export class Headquarter {
  @PrimaryGeneratedColumn('uuid')
  headquarterId: string;

  @Column({ type: 'varchar', nullable: false, unique: true })
  headquarterName: string;

  @Column({ type: 'varchar', nullable: false, unique: true })
  headquarterAddress: string;

  @ManyToOne(() => Company, (company) => company.headquarters, {
    nullable: false,
  })
  @JoinColumn()
  company: Company;

  @OneToMany(() => Employee, (employees) => employees.headquarter, {
    nullable: true,
  })
  @JoinColumn()
  employees: Array<Employee>;

  @OneToMany(() => Sale, (sale) => sale.headquarter, { nullable: true })
  @JoinColumn()
  sales: Array<Sale>;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;
}
