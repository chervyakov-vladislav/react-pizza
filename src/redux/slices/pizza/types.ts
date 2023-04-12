import { LoadingStatus, PizzaBlockInteface } from '../../../@types/types';

export type SearchPizzaParams = {
  sort: string;
  category: string;
  search: string;
  currentPage: string;
};

export interface PizzaSliceState {
  pizzas: PizzaBlockInteface[];
  status: LoadingStatus;
}