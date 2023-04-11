export type ItemType = {
  id: string;
  title: string;
  price: number;
  imageUrl: string;
  type: string;
  size: number;
  count: number;
};

export interface PizzaBlockInteface extends ItemType {
  types: number[];
  sizes: number[];
}

export const enum LoadingStatus {
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error',
}