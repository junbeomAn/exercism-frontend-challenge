import React, { useRef } from 'react';

import { ReactComponent as SearchIcon } from '../assets/images/search.svg';

import { ISearchBar } from './SearchBar.entity';

const SEARCH_PLACEHOLDER = `Filter by exercise state`;

const SearchBar = ({ setFilterStateValue }: ISearchBar) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleQueryChange = (e: React.ChangeEvent) => {
    const { value } = e.target as HTMLInputElement;
    setFilterStateValue({ exercise: value });
  };
  const onIconClick = () => {
    inputRef.current?.focus();
  };

  return (
    <div
      className={`w-search h-search ml-24px bg-dark-text-label-default rounded-inner px-21px py-11px flex items-center border border-transparent focus-within:shadow-filter-active focus-within:border-light-blue`}
    >
      <SearchIcon onClick={onIconClick} />
      <input
        ref={inputRef}
        className='flex items-center w-full h-full text-md leading-22px text-label-default placeholder-label-secondary bg-dark-text-label-default ml-16px focus:outline-none font-normal'
        onChange={handleQueryChange}
        placeholder={SEARCH_PLACEHOLDER}
        type='text'
      />
    </div>
  );
};

export default SearchBar;
