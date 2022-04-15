import React, { useContext } from 'react';

import { ReactComponent as PageLogo } from '../assets/images/page-logo.svg';
import { ReactComponent as ZigZag } from '../assets/images/zigzag.svg';
import { TotalCountContext } from '../contexts/totalCountContext';

const PageTitle = () => {
  const { totalCount } = useContext(TotalCountContext);

  return (
    <div className='w-title-top h-title-top flex flex-col items-center mt-40px mb-32px'>
      <PageLogo />
      <div className='flex items-center min-w-title h-title mt-12px mb-16px text-h2 text-label-default font-bold'>
        Testimonials I've left
        <span className='flex items-center h-32px ml-16px font-medium px-12px py-4px text-base text-label-secondary rounded-half-circle leading-[32px] border border-dark-text-default-base'>
          {totalCount}
        </span>
      </div>
      <ZigZag />
    </div>
  );
};

export default PageTitle;
