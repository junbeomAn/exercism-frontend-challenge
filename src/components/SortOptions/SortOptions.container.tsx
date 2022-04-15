import React, { useState } from 'react';

import { ReactComponent as ChevronDown } from 'assets/images/chevron-down.svg';
import { ISortOptions } from './SortOptions.entity';
import { SortBy } from 'common/entities';

const SortOptions = ({ order, setFilterStateValue }: ISortOptions) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleOptionClick = (value: SortBy) => {
    setFilterStateValue({ order: value });
    setIsOpen(false);
  };

  const handleBtnClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div
      onClick={handleBtnClick}
      className='flex items-center justify-between w-sort-option h-sort-option relative bg-dark-text-label-default leading-22px text-md font-normal text-label-secondary rounded-inner px-21px py-12px cursor-pointer'
    >
      {order === SortBy.new ? 'sort by Most Recent' : 'sort by Most Oldest'}
      <ChevronDown />
      {isOpen && (
        <ul className='absolute top-56px left-0 rounded-outer bg-dark-text-label-default w-sort-option p-8px z-10'>
          <li
            onClick={() => handleOptionClick(SortBy.new)}
            className='rounded-outer w-full h-sort-option bg-white text-label-secondary px-21px py-13px mb-8px cursor-pointer'
          >
            sort by Most Recent
          </li>
          <li
            onClick={() => handleOptionClick(SortBy.old)}
            className='rounded-outer w-full h-sort-option bg-white text-label-secondary px-21px py-13px cursor-pointer'
          >
            sort by Most Oldest
          </li>
        </ul>
      )}
    </div>
  );
};

export default SortOptions;
