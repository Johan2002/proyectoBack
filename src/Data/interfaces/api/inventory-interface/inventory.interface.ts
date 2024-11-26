import { IEmployee } from '../employee-interface/employee.interface';
import { IHeadquarter } from '../headquarter-interface/headquarter.interface';
import { IinventoryDetail } from '../inventoryDetail-interface/inventoryDetail.interface';

export interface Iinventory {
  inventoryId: string;
  employee: IEmployee;
  headquarter: IHeadquarter;
  inventoryDetail: IinventoryDetail;
}

export type ICreateInventory = Omit<Iinventory, 'inventoryId'> &
  Partial<Pick<IEmployee, 'employeeId'>> &
  Partial<Pick<IHeadquarter, 'headquarterId'>> &
  Partial<Pick<IinventoryDetail, 'inventoryDetailId'>>;
