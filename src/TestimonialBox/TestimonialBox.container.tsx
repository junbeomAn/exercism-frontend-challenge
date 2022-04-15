import React, { useState, useEffect, useCallback, useContext } from 'react';

import Filter from '../Filter/Filter.container';
import TestimonialList from '../TestimonialList/TestimonialList.container';
import Pagination from '../Pagination/Pagination.container';

import { createQueryString } from '../utils/query';
import Axios from '../utils/request';
import throttle from '../utils/throttle';
import { TotalCountContext } from '../contexts/totalCountContext';

import { ITestimonialsResponse } from './TestimonialBox.entity';
import {
  IFetchParams,
  ITestimonialItem,
  SortBy,
  IFilterState,
  ITrackFilter,
} from '../common/entities';

const TestimonialBox = () => {
  const [testimonials, setTestimonials] = useState<ITestimonialItem[]>([]);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [filterState, setFilterState] = useState<IFilterState>({
    track: {} as ITrackFilter,
    exercise: '',
    order: SortBy.new,
  });
  const [page, setPage] = useState<number>(1);
  const [trackCounts, setTrackCounts] = useState<{ [key: string]: number }>({});
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const { setTotalCount } = useContext(TotalCountContext);

  const setFilterStateValue = (filterState: Partial<IFilterState>) => {
    setFilterState((prev) => ({ ...prev, ...filterState }));
  };

  const getTestimonials = useCallback(
    async ({
      page = 1,
      order = SortBy.new,
      track = '',
      exercise = '',
    }: IFetchParams) => {
      const query: IFetchParams = {
        page,
        order,
        track,
        exercise,
      };
      const params = createQueryString<IFetchParams>(query);
      setIsLoading(true);
      try {
        const res = await Axios.get<ITestimonialsResponse>(
          '/hiring/testimonials' + params
        );
        const { results, pagination, track_counts } = res.data.testimonials;

        setTestimonials(results.slice(0, 10));
        setTotalPages(pagination.total_pages);
        setTrackCounts(track_counts);
        setTotalCount(pagination.total_count);
      } catch (err) {
        if (err instanceof Error) {
          console.error(err.message);
          alert('Failed to load results. Please try it again.');
        }
      } finally {
        setIsLoading(false);
      }
    },
    [setTotalCount]
  );

  const getNextPage = (p: number) => {
    setPage(p);
    getTestimonials({
      page: p,
      track: filterState.track.slug,
      order: filterState.order,
      exercise: filterState.exercise,
    });
  };

  useEffect(() => {
    const filterValue = {
      order: filterState.order,
      track: filterState.track.slug,
      exercise: filterState.exercise,
    };
    throttle(getTestimonials, 300, filterValue);
    setPage(1);
  }, [filterState, getTestimonials]);

  return (
    <div className='w-testimonial h-list-container overflow-y-auto rounded-outer bg-white shadow-container'>
      <Filter
        filterState={filterState}
        trackCounts={trackCounts}
        setFilterStateValue={setFilterStateValue}
      />
      <TestimonialList testimonials={testimonials} isLoading={isLoading} />
      <Pagination
        totalPages={totalPages}
        page={page}
        getNextPage={getNextPage}
      />
    </div>
  );
};

export default TestimonialBox;
