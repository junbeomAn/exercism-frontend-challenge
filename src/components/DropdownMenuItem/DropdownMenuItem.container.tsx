import React from 'react';

import { IDropdownMenuItem } from './DropdownMenuItem.entity';

const DropdownMenuItem = ({
  handleItemChange,
  title,
  icon_url,
  checked,
  trackCount,
}: IDropdownMenuItem) => {
  return (
    <li
      data-testid='dropdown-item'
      className='w-full h-dropdown-item flex items-center hover:bg-dark-text-label-default ml-0 px-24px hover:bg-lightGrey'
    >
      <label className='w-full h-full flex relative justify-between items-center  cursor-pointer'>
        <div className='h-full flex items-center'>
          <input
            type={'radio'}
            name='track'
            checked={checked}
            onChange={handleItemChange}
            className='absolute w-0 h-0 opacity-0 cursor-pointer peer'
          />
          <div
            className={`peer-checked:after:block mr-24px relative border border-label-secondary w-check-box h-check-box rounded-circle bg-white after:content-[''] after:absolute after:hidden after:w-dot after:h-dot after:rounded-circle after:bg-light-text-default-base after:left-1/2 after:top-1/2 after:-translate-x-1/2 after:-translate-y-1/2`}
          ></div>
          <img
            src={icon_url}
            alt='track'
            className='w-icon-big h-icon-big mr-16px'
          />
          <span>{title}</span>
        </div>
        <div className='flex items-center justify-center text-base text-label-secondary font-medium px-12px py-3px h-[30px] rounded-half-circle border border-dark-text-label-secondary'>
          {trackCount ?? 0}
        </div>
      </label>
    </li>
  );
};

export default DropdownMenuItem;
