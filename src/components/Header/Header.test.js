import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { createMemoryHistory } from 'history';

import Header from './Header.container';

describe('Header component', () => {
  test('should have class name text-label-default when tab clicked', () => {
    const history = createMemoryHistory();

    render(
      <BrowserRouter history={history}>
        <Header />
      </BrowserRouter>
    );

    const tracksTab = screen.getByText('Dashboard');
    fireEvent.click(tracksTab);
    expect(tracksTab).toHaveClass('text-label-default');
  });

  test('should move to / when logo clicked', () => {
    const history = createMemoryHistory();

    render(
      <BrowserRouter history={history}>
        <Header />
      </BrowserRouter>
    );
    const tracksTab = screen.getByText('Dashboard');
    const logo = screen.getByText(/logo/i);

    fireEvent.click(tracksTab);
    fireEvent.click(logo);

    expect(history.location.pathname).toBe('/');
  });
});
