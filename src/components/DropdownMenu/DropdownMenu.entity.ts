import { IFilterState, ITrack, ITrackFilter } from 'common/entities';

export interface IDropdownMenu {
  track: ITrackFilter;
  trackCounts: { [key: string]: number };
  setFilterStateValue(filterState: Partial<IFilterState>): void;
}

export interface ITracksResponse {
  tracks: ITrack[];
}
