export interface FilterSliceState {
  categoryId: number;
  currentPage: number;
  searchValue: string;
  sort: SortInterface;
}

export interface SortInterface {
  name: string;
  sortProperty: string;
}
