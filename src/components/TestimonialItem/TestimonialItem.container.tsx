import React from 'react';
import dayjs from 'dayjs';
import relTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/en';

import { ReactComponent as ChevronRight } from 'assets/images/chevron-right.svg';

import { ITestimonialItem } from 'common/entities';

dayjs.extend(relTime);
dayjs.locale('en');

const TestimonialItem = ({
  id,
  track,
  exercise,
  mentor,
  content,
  created_at,
}: ITestimonialItem) => {
  const handleItemClick = (_: React.MouseEvent) => {
    window.history.pushState(null, '', `${id}`);
  };
  return (
    <li
      onClick={handleItemClick}
      className='relative px-24px w-full h-testimonial-item flex justify-between items-center border-b border-b-light-border-grey bg-white hover:bg-item-bg-grey cursor-pointer'
    >
      <div className='flex items-center'>
        <img src={track.icon_url} className='w-icon-sm h-icon-sm' alt='track' />
        <div className='flex items-center ml-24px'>
          <img
            src={mentor.avatar_url}
            className='rounded-circle w-icon-big h-icon-big'
            alt='mentor-avatar'
          />
          <div className='flex flex-col ml-16px'>
            <span className='text-md font-medium leading-24px text-label-default'>
              {mentor.handle}
            </span>
            <span className='text-base font-normal leading-21px text-label-secondary'>
              on {exercise.title} in {track.title}
            </span>
          </div>
        </div>
      </div>
      <div className='absolute left-content top-1/2 -translate-y-1/2  w-testimonial-content text-left text-light-text-default-base text-md-sm font-normal leading-26px'>
        <p className='w-full overflow-x-hidden text-ellipsis whitespace-nowrap'>
          {content}
        </p>
      </div>
      <div className='flex h-full items-center'>
        <span className='text-base text-label-secondary font-medium leading-19px mr-56px'>
          {dayjs(created_at).fromNow(true)} ago
        </span>
        <ChevronRight />
      </div>
    </li>
  );
};

export default TestimonialItem;
