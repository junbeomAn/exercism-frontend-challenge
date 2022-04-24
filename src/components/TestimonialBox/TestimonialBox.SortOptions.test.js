import { render, screen, within, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { TotalCountContextProvider } from 'contexts/totalCountContext';

import TestimonialBox from './TestimonialBox.container';

/**
 * sort by newest
 * - time unit a < b => true
 * - time unit a > b => false
 * - time unit a === b => timeAmount compare. a < b => true, a > b => false a === b => true
 * sort by oldest
 * all reversed
 */

describe('SortOptions Component', () => {
  beforeEach(() => {
    window.globalThis.IS_REACT_ACT_ENVIRONMENT = true;
    jest.useFakeTimers();
    jest.advanceTimersByTime(300); // because of throttle
  });
  afterEach(() => {
    jest.useRealTimers();
    jest.clearAllTimers();
  });
  test('filter is applied to testimonial list, so items sorted by created time)', async () => {
    const timeUnit = [
      'minute',
      'minutes',
      'hour',
      'hours',
      'day',
      'days',
      'month',
      'months',
      'year',
      'years',
    ];
    const check = (timeA, timeB, sortBy) => {
      const [aAmount, aUnit] = timeA.split(' ');
      const [bAmount, bUnit] = timeB.split(' ');

      const aUnitIdx = timeUnit.indexOf(aUnit);
      const bUnitIdx = timeUnit.indexOf(bUnit);
      if (sortBy === 'new') {
        if (aUnitIdx < bUnitIdx) {
          return true;
        } else if (aUnitIdx > bUnitIdx) {
          return false;
        } else {
          return +aAmount <= +bAmount;
        }
      } else if (sortBy === 'old') {
        if (aUnitIdx > bUnitIdx) {
          return true;
        } else if (aUnitIdx < bUnitIdx) {
          return false;
        } else {
          return +aAmount >= +bAmount;
        }
      }
    };

    const isSorted = (arr, sortBy) => {
      for (let i = 0; i < arr.length - 1; i++) {
        if (!check(arr[i], arr[i + 1], sortBy)) {
          return false;
        }
      }
      return true;
    };

    render(<TestimonialBox />, { wrapper: TotalCountContextProvider });

    const testimonialList = await screen.findByTestId('testimonial-list');
    const testimonialItems = within(testimonialList).getAllByRole('listitem');
    const itemsArray = testimonialItems.map((item) => {
      return within(item).getByText(/ago/).textContent;
    });

    const sortOptionText = screen.getByRole('button', {
      name: /sort by/i,
    }).textContent;
    const sortBy = sortOptionText.includes('Recent') ? 'new' : 'old';

    expect(isSorted(itemsArray, sortBy)).toBe(true);
  });
  test('filter changed when sort option is clicked', async () => {
    render(<TestimonialBox />, { wrapper: TotalCountContextProvider });

    const sortOptionBtn = screen.getByRole('button', {
      name: /sort by Most Recent/,
    });

    userEvent.click(sortOptionBtn);
    const optionList = await within(sortOptionBtn).findByRole('list');

    await waitFor(() => {
      expect(optionList).toBeInTheDocument();
    });
    const sortByOldestBtn =
      within(optionList).getByText(/sort by most oldest/i);

    userEvent.click(sortByOldestBtn);

    await waitFor(() => {
      expect(sortOptionBtn).toHaveTextContent(/sort by most oldest/i);
    });
  });
});
