import { IEmployee } from '../employee-interface/employee.interface';
import { IHeadquarter } from '../headquarter-interface/headquarter.interface';
import { IinventoryDetail } from '../inventoryDetail-interface/inventoryDetail.interface';
import { IProduct } from '../product-interface/product.interface';

export interface Iinventory {
  inventoryId: string;
  product: Array<IProduct>;
  employee: IEmployee;
  headquarter: IHeadquarter;
  inventoryDetail: IinventoryDetail;
}

export type ICreateInventory = Pick<
  Iinventory,
  'product' | 'employee' | 'headquarter'
>;
