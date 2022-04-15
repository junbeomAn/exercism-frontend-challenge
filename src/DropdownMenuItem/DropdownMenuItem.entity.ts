export interface IDropdownMenuItem {
  slug: string;
  icon_url: string;
  checked: boolean;
  title: string;
  trackCount: number;
  handleItemClick(): void;
}
