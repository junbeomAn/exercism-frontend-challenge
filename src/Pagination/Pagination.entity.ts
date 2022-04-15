export interface IPagination {
  totalPages: number;
  page: number;
  getNextPage(p: number): void;
}

type PageBtnType = 'number' | 'arrow';

export type IPageButton = React.PropsWithChildren<{
  styles?: string;
  disabled?: boolean;
  selected?: boolean;
  type?: PageBtnType;
  onClick(e: React.MouseEvent): void;
}>;
