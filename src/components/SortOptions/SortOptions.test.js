import { render, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import SortOptions from './SortOptions.container';
import { SortBy } from 'common/entities';

describe('SortOptions Component', () => {
  test('render option sort by Most Recent in default', () => {
    render(<SortOptions order={SortBy.new} />);
    const options = screen.getByRole('button');

    expect(options).toHaveTextContent('sort by Most Recent');
  });

  test('should open options list when option button clicked', async () => {
    render(<SortOptions order={SortBy.new} />);
    const options = screen.getByRole('button');

    userEvent.click(options);

    await waitFor(() => {
      const optionsList = screen.getByRole('list');

      expect(optionsList).toBeInTheDocument();
    });
  });

  test('should close options list when option item clicked', async () => {
    const setFilterStateValue = jest.fn();

    render(
      <SortOptions
        order={SortBy.new}
        setFilterStateValue={setFilterStateValue}
      />
    );
    const options = screen.getByRole('button');

    userEvent.click(options);

    const list = await screen.findByRole('list');
    const [item] = within(list).getAllByRole('listitem');

    userEvent.click(item);
    await waitFor(() => {
      expect(setFilterStateValue).toBeCalled();
    });

    await waitFor(() => {
      expect(within(options).queryByRole('list')).not.toBeInTheDocument();
    });
  });
});
