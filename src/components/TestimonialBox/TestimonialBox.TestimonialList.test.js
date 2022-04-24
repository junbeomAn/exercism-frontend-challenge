import { render, screen, within, waitFor } from '@testing-library/react';

import { TotalCountContextProvider } from 'contexts/totalCountContext';

import TestimonialBox from './TestimonialBox.container';

describe('TestimonialList Component', () => {
  beforeEach(() => {
    window.globalThis.IS_REACT_ACT_ENVIRONMENT = true;
    jest.useFakeTimers();
    jest.advanceTimersByTime(300); // because of throttle
  });
  afterEach(() => {
    jest.useRealTimers();
    jest.clearAllTimers();
  });
  test('should render list items', async () => {
    render(<TestimonialBox />, { wrapper: TotalCountContextProvider });

    await waitFor(() => {
      expect(screen.getByTestId('testimonial-list')).toBeInTheDocument();
    });

    const [listItem] = within(
      screen.getByTestId('testimonial-list')
    ).getAllByRole('listitem');

    expect(listItem).toBeInTheDocument();
  });
});
