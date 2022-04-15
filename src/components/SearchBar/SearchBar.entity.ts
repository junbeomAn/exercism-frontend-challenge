import { IFilterState } from 'common/entities';

export interface ISearchBar {
  exercise: string;
  setFilterStateValue(filterState: Partial<IFilterState>): void;
}
