
import { ItemType } from '../@types/types';
import { calcTotalPrice } from './calcTotalPrice';

export const getCartFromLS = () => {
  const data = localStorage.getItem('products');
  const items = data ? JSON.parse(data) : [];
  const totalPrice = calcTotalPrice(items);

  return {
    products: items as ItemType[],
    totalPrice,
  };
};