export interface ITrack {
  title: string;
  slug: string;
  icon_url: string;
}

export type ITrackFilter = Pick<ITrack, 'slug' | 'icon_url'>;

interface IExercise {
  title: string;
  icon_url: string;
}

interface IMentor {
  handle: string;
  avatar_url: string;
}

export interface ITestimonialItem {
  id: string;
  track: Omit<ITrack, 'num_exercises'>;
  exercise: IExercise;
  mentor: IMentor;
  content: string;
  created_at: string;
}

export enum SortBy { // SortOptions
  new = 'newest_first',
  old = 'oldest_first',
}

export interface IFilterState {
  track: ITrackFilter;
  exercise: string;
  order: SortBy;
}

export interface IFetchParams extends Omit<Partial<IFilterState>, 'track'> {
  [key: string]: string | number | undefined;
  page?: number;
  track?: string;
}
