import { render, screen, fireEvent } from '@testing-library/react';
import Pagination from './Pagination.container';

describe('Pagination Component', () => {
  // too much..?

  // page 1, prev non clickable
  // page lastpage, next non clickable
  // page 1, lastpage 100, render 1,2,3 ... 100
  // page 2, lastpage 100, render 1,2,3,4, ... 100
  // page 3, lastpage 100, render 1,2,3,4,5 ... 100
  // page 4, lastpage 100, render 1,2,3,4,5,6 ... 100
  // page 5, lastpage 100, render 1 ... 3,4,5,6,7 ... 100
  // page last, last page 100, render 1 ... 98,99,100
  // page 99, last page 100, render 1 ... 97,98,99,100
  // page 98, last page 100, render 1 ... 96,97,98,99,100
  // page 97, last page 100, render 1 ... 95,96,97,98,99,100
  // page 96, last page 100, render 1 ... 94,95,96,97,98 ... 100

  test('renders first, last, Previous and Next page button in default', () => {
    let page = 1;
    let totalPages = 100;

    render(<Pagination totalPages={totalPages} page={page} />);
    // consider if child is rendered, parent also rendered.
    const prevBtn = screen.getByText('Previous');
    const nextBtn = screen.getByText('Next');

    expect(prevBtn).toBeInTheDocument();
    expect(nextBtn).toBeInTheDocument();

    const firstPageBtn = screen.getByText(1);
    const lastPageBtn = screen.getByText(totalPages);
    const nonExistPageBtn = screen.queryByText(totalPages + 1);

    expect(firstPageBtn).toBeInTheDocument();
    expect(lastPageBtn).toBeInTheDocument();
    expect(nonExistPageBtn).not.toBeInTheDocument();
  });

  test('previous button should be disabled on first page', () => {
    let page = 1;
    let totalPages = 100;

    render(<Pagination totalPages={totalPages} page={page} />);
    const prevBtn = screen.getByTestId('prev-button');

    expect(prevBtn).toBeDisabled();
  });
  test('next button should be disabled on last page', () => {
    let page = 100;
    let totalPages = 100;

    render(<Pagination totalPages={totalPages} page={page} />);
    const nextBtn = screen.getByTestId('next-button');

    expect(nextBtn).toBeDisabled();
  });

  test('should render 1, 2, 3 and 100 page buttons with current page 1 and last page 100', () => {
    let page = 1;
    let totalPages = 100;

    render(<Pagination totalPages={totalPages} page={page} />);

    expect(screen.getByText(1)).toBeInTheDocument();
    expect(screen.getByText(2)).toBeInTheDocument();
    expect(screen.getByText(3)).toBeInTheDocument();
    expect(screen.getByText(totalPages)).toBeInTheDocument();
    expect(screen.queryByText(totalPages + 1)).not.toBeInTheDocument();
  });

  test('should render 1, 2, 3, 4, 5, 6 and 100 page buttons with current page 4 and last page 100', () => {
    let page = 4;
    let totalPages = 100;

    render(<Pagination totalPages={totalPages} page={page} />);

    expect(screen.getByText(1)).toBeInTheDocument();
    expect(screen.getByText(2)).toBeInTheDocument();
    expect(screen.getByText(3)).toBeInTheDocument();
    expect(screen.getByText(4)).toBeInTheDocument();
    expect(screen.getByText(5)).toBeInTheDocument();
    expect(screen.getByText(6)).toBeInTheDocument();
    expect(screen.getByText(totalPages)).toBeInTheDocument();
    expect(screen.queryByText(totalPages + 1)).not.toBeInTheDocument();
  });

  test('should render 1, 94, 95, 96, 97, 98 and 100 page buttons with current page 96 and last page 100', () => {
    let page = 96;
    let totalPages = 100;

    render(<Pagination totalPages={totalPages} page={page} />);

    expect(screen.getByText(1)).toBeInTheDocument();
    expect(screen.getByText(94)).toBeInTheDocument();
    expect(screen.getByText(95)).toBeInTheDocument();
    expect(screen.getByText(96)).toBeInTheDocument();
    expect(screen.getByText(97)).toBeInTheDocument();
    expect(screen.getByText(98)).toBeInTheDocument();
    expect(screen.getByText(totalPages)).toBeInTheDocument();
    expect(screen.queryByText(totalPages + 1)).not.toBeInTheDocument();
  });

  test('should render 1, 98, 99 and 100 page buttons with current page 100 and last page 100', () => {
    let page = 100;
    let totalPages = 100;

    render(<Pagination totalPages={totalPages} page={page} />);

    expect(screen.getByText(1)).toBeInTheDocument();
    expect(screen.getByText(98)).toBeInTheDocument();
    expect(screen.getByText(99)).toBeInTheDocument();
    expect(screen.getByText(totalPages)).toBeInTheDocument();
    expect(screen.queryByText(totalPages + 1)).not.toBeInTheDocument();
  });

  test('should call getNextPage function on btn click', () => {
    const getNextPage = jest.fn();

    render(<Pagination totalPages={100} page={2} getNextPage={getNextPage} />);

    const nextBtn = screen.getByText('Next');
    fireEvent.click(nextBtn);

    expect(getNextPage).toHaveBeenCalled();

    const prevBtn = screen.getByText('Previous');
    fireEvent.click(prevBtn);

    expect(getNextPage).toHaveBeenCalled();

    const secondPageBtn = screen.getByText(2);
    fireEvent.click(secondPageBtn);

    expect(getNextPage).toHaveBeenCalled();
  });

  test('page 2 should have class names to hightlight when page 2 is selected', () => {
    render(<Pagination totalPages={100} page={2} />);

    const secondPageBtn = screen.getByText(2);
    const classNames =
      `bg-light-highlight border-label-tertiary text-label-default`.split(' ');

    expect(secondPageBtn).toHaveClass(...classNames);
  });
  // prev, next both disabled when total page is 1
  test('should have both prev and next button disabled when total page is 1', () => {
    render(<Pagination totalPages={1} page={1} />);

    const prevBtn = screen.getByTestId('prev-button');
    const nextBtn = screen.getByTestId('next-button');

    expect(prevBtn).toBeDisabled();
    expect(nextBtn).toBeDisabled();
  });
});
