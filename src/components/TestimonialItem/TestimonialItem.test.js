import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import dayjs from 'dayjs';
import relTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/en';

import TestimonialItem from 'components/TestimonialItem/TestimonialItem.container';

dayjs.extend(relTime);
dayjs.locale('en');

describe('TestimonialItem Component', () => {
  const data = {
    id: 12120,
    track: {
      slug: 'rust',
      title: 'Rust',
      icon_url: 'https://dg8krxphbh767.cloudfront.net/tracks/rust.svg',
    },
    exercise: {
      slug: 'anagram',
      title: 'Anagram',
      icon_url: 'https://dg8krxphbh767.cloudfront.net/exercises/anagram.svg',
    },
    mentor: {
      handle: 'My-',
      avatar_url: 'https://avatars2.githubusercontent.com/u/10456471?v=4',
    },
    content: 'Got nice feedback.',
    created_at: '2020-08-14T10:37:34.000Z',
  };
  test('should change url when item is clicked', async () => {
    render(<TestimonialItem {...data} />);

    const item = screen.getByText(data.content);

    userEvent.click(item);
    await waitFor(() => {
      expect(window.location.pathname).toBe(`/${data.id}`);
    });
  });

  test('should render data in the component', async () => {
    render(<TestimonialItem {...data} />);

    const trackImg = screen.getByAltText('track');
    const mentorAvatar = screen.getByAltText('mentor-avatar');
    const mentorHandle = screen.getByText(data.mentor.handle);
    const title = screen.getByText(
      `on ${data.exercise.title} in ${data.track.title}`
    );
    const timeStamp = await screen.findByText(
      `${dayjs(data.created_at).fromNow(true)} ago`
    );

    expect(trackImg.src).toBe(data.track.icon_url);
    expect(mentorAvatar.src).toBe(data.mentor.avatar_url);
    expect(mentorHandle).toBeInTheDocument();
    expect(title).toBeInTheDocument();
    expect(timeStamp).toBeInTheDocument();
  });
});
