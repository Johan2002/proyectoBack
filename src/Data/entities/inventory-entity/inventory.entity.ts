import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { Product } from '../product-entity/product.entity';
import { InventoryDetail } from '../inventory-detail-entity/inventory-detail.entity';
import { Employee } from '../employee-entity/employee.entity';
import { Headquarter } from '../headquarter-entity/headquarter.entity';

@Entity()
export class Inventory {
  @PrimaryGeneratedColumn('uuid')
  inventoryId: string;

  @ManyToOne(() => Product, (product) => product.inventory, { eager: true })
  @JoinColumn()
  product: Array<Product>;

  @ManyToOne(() => Employee, (employee) => employee.inventory)
  @JoinColumn()
  employee: Employee;

  @ManyToOne(() => Headquarter, (headquarter) => headquarter.inventory)
  @JoinColumn()
  headquarter: Headquarter;

  @OneToMany(
    () => InventoryDetail,
    (inventoryDetail) => inventoryDetail.inventory,
  )
  inventoryDetail: InventoryDetail;

  @CreateDateColumn()
  createdAt: Date;
}
