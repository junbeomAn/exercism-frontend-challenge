import React from 'react';
import TestimonialItem from '../TestimonialItem/TestimonialItem.container';

import { ITestimonialList } from './TestimonialList.entity';
import NoResults from '../NoResults/NoResults.presenter';
import Spinner from '../Spinner/Spinner.presenter';

const TestimonialList = ({ testimonials, isLoading }: ITestimonialList) => {
  const testimonialItems = testimonials.map((item) => (
    <TestimonialItem key={item.id} {...item} />
  ));

  if (isLoading) {
    return <Spinner message='Now loading testimonials...' />;
  }

  if (testimonialItems.length === 0) {
    return <NoResults />;
  }

  return <ul className='w-testimonial h-testimonial'>{testimonialItems}</ul>;
};

export default TestimonialList;
