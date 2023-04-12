import { ItemType } from '../@types/types';

export const calcTotalPrice = (items: ItemType[]) => {
  return items.reduce((sum, obj) => obj.price * obj.count + sum, 0);
};