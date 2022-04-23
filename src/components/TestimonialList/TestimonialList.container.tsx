import React from 'react';
import TestimonialItem from 'components/TestimonialItem/TestimonialItem.container';

import { ITestimonialList } from './TestimonialList.entity';
import NoResults from 'components/NoResults/NoResults.presenter';
import Spinner from 'components/Spinner/Spinner.presenter';

const TestimonialList = ({ testimonials, isLoading }: ITestimonialList) => {
  const testimonialItems = testimonials.map((item) => (
    <TestimonialItem key={item.id} {...item} />
  ));

  if (isLoading) {
    return <Spinner message='Now loading testimonials...' />;
  }

  if (testimonials.length === 0) {
    return <NoResults />;
  }

  return (
    <ul data-testid='testimonial-list' className='w-testimonial h-testimonial'>
      {testimonialItems}
    </ul>
  );
};

export default TestimonialList;
