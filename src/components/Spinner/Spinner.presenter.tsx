import React from 'react';
import { ReactComponent as LoadingSpinner } from 'assets/images/loading-spinner.svg';

const SpinnerPresenter = ({ message = '' }) => {
  return (
    <div className='w-testimonial h-testimonial flex flex-col items-center justify-center'>
      <LoadingSpinner className='animate-spin' />
      {message && <span className='mt-4 text-xl'>{message}</span>}
    </div>
  );
};

export default SpinnerPresenter;
