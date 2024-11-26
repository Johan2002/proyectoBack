import { IProduct } from '../product-interface/product.interface';

export interface IinventoryDetail {
  inventoryDetailId: string;
  quantityInicial: number;
  quantityFinal: number;
  quantitySale: number;
  inventoryDate: Date;
}

export type ICreateInventoryDetail = Pick<IinventoryDetail, 'quantityFinal'> & {
  products: Array<Products>;
};

type Products = Pick<IProduct, 'productId'> &
  Pick<IinventoryDetail, 'quantityFinal'>;
