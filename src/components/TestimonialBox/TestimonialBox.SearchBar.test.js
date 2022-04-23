import {
  render,
  screen,
  within,
  waitFor,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { TotalCountContextProvider } from 'contexts/totalCountContext';

import TestimonialBox from './TestimonialBox.container';

describe('SearchBar Component', () => {
  beforeEach(() => {
    window.globalThis.IS_REACT_ACT_ENVIRONMENT = true;
    jest.useFakeTimers();
    jest.advanceTimersByTime(300); // because of throttle
  });
  afterEach(() => {
    jest.useRealTimers();
    jest.clearAllTimers();
  });
  test('exercise search filter is applied to dropdown list result', async () => {
    render(<TestimonialBox />, { wrapper: TotalCountContextProvider });
    await waitForElementToBeRemoved(() => screen.queryByTitle(/loading/i));

    const input = within(screen.getByTestId('search-bar')).getByRole('textbox');
    const inputValue = 'gigasecond';

    userEvent.type(input, inputValue);

    // wait for input value typing letter by letter (because of throttling search)
    for (let i = 0; i < inputValue.length; i++) {
      await waitFor(() => {
        expect(input).toHaveValue(inputValue.slice(0, i + 1));
      });
    }

    await waitFor(() => {
      expect(screen.getByTestId('testimonial-list')).toBeInTheDocument();
    });

    const [listItem] = within(
      screen.getByTestId('testimonial-list')
    ).getAllByRole('listitem');

    expect(listItem).toHaveTextContent(/gigasecond/i);
  });

  /** TestimonialList
   *   should render items
   *
   * */

  /** Pagination
   *    when next page or button 2 clicked, next page should be rendered
   *    when prev page clicked, prev page should be rendered
   *  use to be called with (page) -> move to pagination test file
   *  */
});
