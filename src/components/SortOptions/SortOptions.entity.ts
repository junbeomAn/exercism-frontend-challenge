import { IFilterState, SortBy } from 'common/entities';

export interface ISortOptions {
  order: SortBy;
  setFilterStateValue(filterState: Partial<IFilterState>): void;
}
