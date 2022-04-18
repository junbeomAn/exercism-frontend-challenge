import { render, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import DropdownMenu from './DropdownMenu.container';
// open close
// get tracks api call

describe('DropdownMenu Component', () => {
  test('should open dropdown list when current track clicked', async () => {
    render(<DropdownMenu trackCounts={{}} />);

    const currentTrackBtn = screen.getByRole('button');
    userEvent.click(currentTrackBtn);

    const dropdown = screen.getByTestId('dropdown');

    await waitFor(() => {
      expect(within(dropdown).getByRole('list')).toBeInTheDocument();
    });
  });

  test('should close dropdown list when current track clicked again', async () => {
    render(<DropdownMenu trackCounts={{}} />);

    const currentTrackBtn = screen.getByRole('button');
    userEvent.click(currentTrackBtn);
    userEvent.click(currentTrackBtn);

    const dropdown = screen.getByTestId('dropdown');

    await waitFor(() => {
      expect(within(dropdown).queryByRole('list')).not.toBeInTheDocument();
    });
  });

  test('should close dropdown list when Escape key pressed', async () => {
    render(<DropdownMenu trackCounts={{}} />);

    const currentTrackBtn = screen.getByRole('button');
    userEvent.click(currentTrackBtn);

    const dropdown = screen.getByTestId('dropdown');

    expect(await within(dropdown).findByRole('list')).toBeInTheDocument();

    userEvent.keyboard('[Escape]');
    expect(await within(dropdown).findByRole('list')).not.toBeInTheDocument();
  });

  test('dropdown items should be rendered', async () => {
    render(<DropdownMenu trackCounts={{}} />);

    const currentTrackBtn = screen.getByRole('button');
    userEvent.click(currentTrackBtn);

    const dropdown = screen.getByTestId('dropdown');

    await waitFor(() => {
      expect(within(dropdown).getAllByRole('listitem')).toHaveLength(7);
    });
  });

  test('setFilterStateValue should be called when item clicked', async () => {
    const setFilterStateValue = jest.fn();
    render(
      <DropdownMenu
        trackCounts={{}}
        setFilterStateValue={setFilterStateValue}
      />
    );

    const currentTrackBtn = screen.getByRole('button');
    userEvent.click(currentTrackBtn);

    const dropdown = screen.getByTestId('dropdown');

    const cItem = await within(dropdown).findByText('C++');

    userEvent.click(cItem);
    await waitFor(() => {
      expect(setFilterStateValue).toHaveBeenCalled();
    });
  });

  test('dropdown should be closed when item clicked', async () => {
    const setFilterStateValue = jest.fn();
    render(
      <DropdownMenu
        trackCounts={{}}
        setFilterStateValue={setFilterStateValue}
      />
    );

    const currentTrackBtn = screen.getByRole('button');
    userEvent.click(currentTrackBtn);

    const dropdown = screen.getByTestId('dropdown');

    const cItem = await within(dropdown).findByText('C++');

    userEvent.click(cItem);
    await waitFor(() => {
      expect(within(dropdown).queryByRole('list')).not.toBeInTheDocument();
    });
  });

  test('current track icon url should be rendered on track button', async () => {
    const setFilterStateValue = jest.fn();
    render(
      <DropdownMenu
        trackCounts={{}}
        track={{ icon_url: '../../assets/images/track.svg', slug: '' }}
        setFilterStateValue={setFilterStateValue}
      />
    );

    const currentTrackBtn = screen.getByRole('button');
    expect(
      within(currentTrackBtn).getByAltText('current-track')
    ).toHaveAttribute('src', '../../assets/images/track.svg');
  });
});
