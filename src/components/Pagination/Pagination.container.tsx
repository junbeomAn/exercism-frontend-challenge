import React, { useRef } from 'react';

import { ReactComponent as ArrowLeft } from 'assets/images/arrow-left.svg';
import { ReactComponent as ArrowRight } from 'assets/images/arrow-right.svg';

import { IPageButton, IPagination } from './Pagination.entity';

const Pagination = ({ totalPages, page, getNextPage }: IPagination) => {
  const idRef = useRef(-1);

  const createCenterPages = (start: number, end: number) => {
    const range: number[] = [];

    Array(end - start + 1)
      .fill(0)
      .forEach(() => {
        const isOutOfRange = start <= 0 || start > totalPages;
        if (isOutOfRange) {
          start += 1;
          return;
        }
        range.push(start);
        start += 1;
      });
    return range;
  };

  const addSidePages = (pages: number[]) => {
    const result: number[] = [];
    const [firstPage, lastPage] = [pages[0], pages[pages.length - 1]];

    if (firstPage >= 2) {
      // first page
      result.push(1);
    }
    if (firstPage > 2) {
      // front dots
      result.push(0);
    }

    result.push(...pages); // others

    if (lastPage < totalPages - 1) {
      // rear dots
      result.push(0);
    }
    if (lastPage <= totalPages - 1) {
      // last page
      result.push(totalPages);
    }
    return result;
  };

  const getPageButtons = (currentPage: number) => {
    let start = currentPage - 2;
    let end = currentPage + 2;

    const pages: number[] = addSidePages(createCenterPages(start, end));

    return (
      <ul className='flex'>
        {pages.map((p, i) => {
          idRef.current += 1;
          const isDots = p === 0;

          if (isDots) {
            return (
              <li
                className='w-[43px] h-page-btn text-center leading-[40px] mx-8px'
                key={idRef.current}
              >
                ...
              </li>
            );
          }

          const isNextDots = pages[i + 1] === 0;
          const addMarginIfNextDots = isNextDots ? '' : 'mr-12px';
          return (
            <li
              key={idRef.current}
              className={`${addMarginIfNextDots} last:mr-0`}
            >
              <PageButton
                type='number'
                selected={page === p}
                onClick={() => getNextPage(p)}
              >
                {p}
              </PageButton>
            </li>
          );
        })}
      </ul>
    );
  };

  return (
    <section
      data-testid='pagination'
      className='w-full flex justify-between h-pagination px-32px py-16px border-t border-light-border'
    >
      <PageButton
        type='arrow'
        disabled={page === 1}
        onClick={() => getNextPage(page - 1)}
        styles='flex items-center'
      >
        <ArrowLeft
          className={`mr-10px ${
            page === 1 ? `stroke-label-tertiary` : 'stroke-label-secondary'
          }`}
        />
        <div className='h-24px text-base font-medium leading-24px'>
          Previous
        </div>
      </PageButton>
      {getPageButtons(page)}
      <PageButton
        type='arrow'
        disabled={page === totalPages}
        onClick={() => getNextPage(page + 1)}
        styles='flex items-center'
      >
        <div className='h-24px text-base font-medium leading-24px'>Next</div>
        <ArrowRight
          className={`ml-10px ${
            page === totalPages
              ? `stroke-label-tertiary`
              : 'stroke-label-secondary'
          }`}
        />
      </PageButton>
    </section>
  );
};

export default Pagination;

function PageButton({
  children,
  styles = '',
  onClick,
  disabled = false,
  selected = false,
  type = 'number',
  ...args
}: IPageButton) {
  const getPageBtnCustomStyles = (
    type: string,
    selected: boolean,
    disabled: boolean
  ) => {
    let customStyles = '';

    if (type === 'number') {
      customStyles += `${
        selected
          ? `bg-light-highlight border-label-tertiary text-label-default `
          : `bg-white border-light-border text-label-secondary `
      }`;
    } else if (type === 'arrow') {
      customStyles += `${
        disabled
          ? `border-transparent bg-light-divider text-label-tertiary `
          : `border-light-border text-label-secondary shadow-btn-active `
      }`;
    }
    return customStyles;
  };

  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={`h-page-btn leading-40px px-16px border rounded-inner ${getPageBtnCustomStyles(
        type,
        selected,
        disabled
      )} ${styles}`}
      {...args}
    >
      {children}
    </button>
  );
}
