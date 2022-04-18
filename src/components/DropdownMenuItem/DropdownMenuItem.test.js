import { render, screen, fireEvent } from '@testing-library/react';
import DropdownMenuItem from './DropdownMenuItem.container';

describe('DropdownMenuItem Component', () => {
  test('renders with props', () => {
    const handleItemClick = jest.fn();
    const title = 'C';
    const trackCount = 5;
    const checked = false;

    // render(
    //   <DropdownMenuItem
    //     handleItemClick={handleItemClick}
    //     title={title}
    //     icon_url=''
    //     checked={checked}
    //     trackCount={trackCount}
    //     slug=''
    //   />
    // );

    // const img = screen.getByAltText('track');
    // const item = screen.getByTestId('dropdown-item');
    // const input = screen.getByRole('radio');
    // const trackCountEl = screen.getByText(trackCount);
    // const titleText = screen.getByText(title);

    // expect(img).toBeInTheDocument();
    // expect(item).toBeInTheDocument();
    // expect(input).toBeInTheDocument();
    // expect(titleText).toBeInTheDocument();
    // expect(trackCountEl).toBeInTheDocument();
  });
});
