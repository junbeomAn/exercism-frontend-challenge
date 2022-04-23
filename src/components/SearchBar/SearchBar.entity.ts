import { IFilterState } from 'common/entities';

export interface ISearchBar {
  setFilterStateValue(filterState: Partial<IFilterState>): void;
}
