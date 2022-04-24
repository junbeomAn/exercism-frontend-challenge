import { render, screen, within, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { TotalCountContextProvider } from 'contexts/totalCountContext';

import TestimonialBox from './TestimonialBox.container';

describe('Dropdown Component', () => {
  beforeEach(() => {
    window.globalThis.IS_REACT_ACT_ENVIRONMENT = true;
    jest.useFakeTimers();
    jest.advanceTimersByTime(300); // because of throttle
  });
  afterEach(() => {
    jest.useRealTimers();
    jest.clearAllTimers();
  });
  test('should be closed when outside of dropdown list area is clicked', async () => {
    render(<TestimonialBox />, { wrapper: TotalCountContextProvider });

    const dropdown = screen.getByTestId('dropdown');
    const dropdownBtn = within(dropdown).getByRole('button');

    userEvent.click(dropdownBtn);

    await waitFor(() => {
      const dropdownList = within(dropdown).getByRole('list');
      expect(dropdownList).toBeInTheDocument();
    });

    userEvent.click(screen.getByTestId('search-bar'));

    await waitFor(() => {
      const dropdownList = within(dropdown).queryByRole('list');
      expect(dropdownList).not.toBeInTheDocument();
    });
  });
  test('item filter is applied to current track button img when track filter is changed', async () => {
    render(<TestimonialBox />, { wrapper: TotalCountContextProvider });

    const dropdown = screen.getByTestId('dropdown');
    const dropdownBtn = within(dropdown).getByRole('button');

    userEvent.click(dropdownBtn);

    const [_, item] = await within(dropdown).findAllByRole('listitem');

    userEvent.click(within(item).getByRole('radio'));

    const currentTrackImg = screen.getByAltText('current-track');
    const selectedItemImg = within(item).getByAltText('track');

    await waitFor(() => {
      expect(currentTrackImg.src).toEqual(selectedItemImg.src);
    });
  });
  test('item filter is applied to dropdown list', async () => {
    render(<TestimonialBox />, { wrapper: TotalCountContextProvider });

    const dropdown = screen.getByTestId('dropdown');
    const dropdownBtn = within(dropdown).getByRole('button');

    userEvent.click(dropdownBtn);

    const [listitem] = await within(dropdown).findAllByRole('listitem');

    await waitFor(() => {
      const radio = within(listitem).getByRole('radio');
      expect(radio.checked).toBe(true);
    });
  });
});
