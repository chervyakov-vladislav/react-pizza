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