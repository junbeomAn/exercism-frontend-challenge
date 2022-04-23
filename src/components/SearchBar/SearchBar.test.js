import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import SearchBar from 'components/SearchBar/SearchBar.container';

describe('SearchBar Component', () => {
  test('should render input element', () => {
    render(<SearchBar />);

    const input = screen.getByRole('textbox');

    expect(input).toBeInTheDocument();
  });
  test('setFilterStateValue should be called when input value changes', async () => {
    const setFilterStateValue = jest.fn();
    render(<SearchBar setFilterStateValue={setFilterStateValue} />);

    const input = screen.getByRole('textbox');
    userEvent.type(input, 'a');

    await waitFor(() => {
      expect(setFilterStateValue).toBeCalled();
    });
  });

  test('should have active style when focused', async () => {
    render(<SearchBar />);

    const input = screen.getByRole('textbox');
    const label = screen.getByTestId('search-bar');

    input.focus();

    expect(label).not.toHaveStyle({
      'border-color': 'transparent',
    });
  });
});
