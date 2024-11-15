import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
} from 'typeorm';
import { Inventory } from '../inventory-entity/inventory.entity';

@Entity()
export class InventoryDetail {
  @PrimaryGeneratedColumn('uuid')
  inventoryDetailId: string;

  @ManyToOne(() => Inventory, (inventory) => inventory.inventoryDetail)
  inventory: Inventory;

  @Column({ type: 'int4' })
  quantityInicial: number;

  @Column({ type: 'int4' })
  quantityFinal: number;

  @Column({ type: 'int4' })
  quantitySale: number;

  @CreateDateColumn()
  inventoryDate: Date;
}
