import { ItemType } from '../../../@types/types';

export interface CartSliceState {
  totalPrice: number;
  products: ItemType[];
}
