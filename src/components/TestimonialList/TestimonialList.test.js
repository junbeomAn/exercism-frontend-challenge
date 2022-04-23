import { render, screen } from '@testing-library/react';
import TestimonialList from 'components/TestimonialList/TestimonialList.container';

describe('TestimonialList Component', () => {
  /** TestimonialList
   * tesetimonial item render
   * */
  test('should render Spinner with message when isLoading prop is true', () => {
    render(<TestimonialList testimonials={[]} isLoading={true} />);

    const loadingMessage = screen.getByText(/Now loading testimonials.../i);

    expect(loadingMessage).toBeInTheDocument();
  });

  test('should render NoResults component with message when testimonials array is empty', () => {
    render(<TestimonialList testimonials={[]} isLoading={false} />);

    const noResultsMesssage = screen.getByText(
      /Sorry, we don't have any results./i
    );

    expect(noResultsMesssage).toBeInTheDocument();
  });

  test('should render TestimonialItem', () => {
    const testimonials = [
      {
        id: 12120,
        track: {
          slug: 'rust',
          title: 'Rust',
          icon_url: 'https://dg8krxphbh767.cloudfront.net/tracks/rust.svg',
        },
        exercise: {
          slug: 'anagram',
          title: 'Anagram',
          icon_url:
            'https://dg8krxphbh767.cloudfront.net/exercises/anagram.svg',
        },
        mentor: {
          handle: 'My-',
          avatar_url: 'https://avatars2.githubusercontent.com/u/10456471?v=4',
        },
        content: 'Got nice feedback.',
        created_at: '2020-08-14T10:37:34.000Z',
      },
    ];
    render(<TestimonialList testimonials={testimonials} isLoading={false} />);

    const [listitem] = screen.getAllByRole('listitem');
    expect(listitem).toBeInTheDocument();
  });
});
