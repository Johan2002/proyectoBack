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

  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'varchar' })
  address: string;

  @ManyToOne(() => Company, (company) => company.headquarters, {
    onDelete: 'SET NULL',
  })
  company: Company;

  @OneToMany(() => Employee, (employee) => employee.headquarters, {
    onDelete: 'SET NULL',
  })
  @JoinColumn()
  employee: Employee;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @DeleteDateColumn({ type: 'timestamp' })
  deletedAt: Date;
}
