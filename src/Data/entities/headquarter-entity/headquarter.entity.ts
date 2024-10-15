import { Company } from '../company-entity/company.entity';
import { Employee } from 'src/Data/entities/employee-entity/employee.entity';
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

@Entity()
export class Headquarter {
  @PrimaryGeneratedColumn('uuid')
  headquarterId: string;

  @Column({ type: 'varchar', unique: true })
  name: string;

  @Column({ type: 'varchar', unique: true })
  address: string;

  @ManyToOne(() => Company, (company) => company.headquarters, {
    onDelete: 'SET NULL',
  })
  company: Company;

  @OneToMany(() => Employee, (employees) => employees.headquarter, {
    onDelete: 'SET NULL',
  })
  @JoinColumn()
  employees: Array<Employee>;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @DeleteDateColumn({ type: 'timestamp' })
  deletedAt: Date;
}
