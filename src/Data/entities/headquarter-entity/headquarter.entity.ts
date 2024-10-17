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

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;
}
