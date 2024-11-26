import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
} from 'typeorm';
import { InventoryDetail } from '../inventory-detail-entity/inventory-detail.entity';
import { Employee } from '../employee-entity/employee.entity';
import { Headquarter } from '../headquarter-entity/headquarter.entity';

@Entity()
export class Inventory {
  @PrimaryGeneratedColumn('uuid')
  inventoryId: string;

  @ManyToOne(() => Employee, (employee) => employee.inventory)
  employee: Employee;

  @ManyToOne(() => Headquarter, (headquarter) => headquarter.inventory)
  headquarter: Headquarter;

  @ManyToOne(() => InventoryDetail)
  inventoryDetail: InventoryDetail;

  @CreateDateColumn()
  createdAt: Date;
}
