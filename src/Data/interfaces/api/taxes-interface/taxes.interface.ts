import { IProduct } from '../product-interface/product.interface';

export interface ITax {
  taxId: string;
  taxName: string;
  taxPorcentage: number;
  product: Array<IProduct>;
}

export type ICreateTax = Omit<ITax, 'taxId' | 'product'>;

export type IUpdateTax = Partial<ICreateTax>;
