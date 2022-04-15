import React from 'react';

import DropdownMenu from '../DropdownMenu/DropdownMenu.container';
import SearchBar from '../SearchBar/SearchBar.container';
import SortOptions from '../SortOptions/SortOptions.container';

import { IFilter } from './Filter.entity';

const Filter = ({ filterState, trackCounts, setFilterStateValue }: IFilter) => {
  return (
    <div className='w-full h-filter flex justify-between py-16px px-24px  border-b border-b-light-border'>
      <div className='flex'>
        <DropdownMenu
          setFilterStateValue={setFilterStateValue}
          track={filterState.track}
          trackCounts={trackCounts}
        />
        <SearchBar
          exercise={filterState.exercise}
          setFilterStateValue={setFilterStateValue}
        />
      </div>
      <SortOptions
        order={filterState.order}
        setFilterStateValue={setFilterStateValue}
      />
    </div>
  );
};

export default Filter;
