import { Iinventory } from '../inventory-interface/inventory.interface';

export interface IinventoryDetail {
  inventoryDetailId: string;
  inventory: Iinventory;
  quantityInicial: number;
  quantityFinal: number;
  quantitySale: number;
}

export type ICreateInventoryDetail = Pick<IinventoryDetail, 'inventory'>;
