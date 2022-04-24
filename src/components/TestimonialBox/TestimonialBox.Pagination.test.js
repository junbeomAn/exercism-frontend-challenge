import { render, screen, within, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import TestimonialBox from './TestimonialBox.container';
import { TotalCountContextProvider } from 'contexts/totalCountContext';

/** Pagination
   *    when next page or button 2 clicked, next page should be rendered
   *    when prev page clicked, prev page should be rendered

   *  */

describe('Pagination Component', () => {
  beforeEach(() => {
    window.globalThis.IS_REACT_ACT_ENVIRONMENT = true;
    jest.useFakeTimers();
    jest.advanceTimersByTime(300); // because of throttle
  });
  afterEach(() => {
    jest.useRealTimers();
    jest.clearAllTimers();
  });

  test('when Next page button is clicked from the first page, second page should be highlighted', async () => {
    render(<TestimonialBox />, { wrapper: TotalCountContextProvider });

    const nextPageBtn = screen.getByRole('button', { name: /Next/i });
    const classNames = `bg-light-highlight border-label-tertiary text-label-default`;

    userEvent.click(nextPageBtn);

    await waitFor(() => {
      expect(
        within(screen.getByTestId('pagination')).getByText(1)
      ).not.toHaveClass(classNames);
    });
    await waitFor(() => {
      expect(within(screen.getByTestId('pagination')).getByText(2)).toHaveClass(
        classNames
      );
    });
  });

  test('when Next page button is clicked, next page should be rendered if next one exists', async () => {
    render(<TestimonialBox />, { wrapper: TotalCountContextProvider });

    const nextPageBtn = screen.getByRole('button', { name: /Next/i });
    userEvent.click(nextPageBtn);

    const testimonialList = await screen.findByTestId('testimonial-list');
    const testimonialItems = within(testimonialList).getAllByRole('listitem');

    expect(testimonialItems).not.toHaveLength(0);
  });
});
