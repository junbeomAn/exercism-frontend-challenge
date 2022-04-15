import { IFilterState } from 'common/entities';

export interface IFilter {
  filterState: IFilterState;
  trackCounts: { [key: string]: number };
  setFilterStateValue(filterState: Partial<IFilterState>): void;
}
