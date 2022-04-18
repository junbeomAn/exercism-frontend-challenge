export interface IDropdownMenuItem {
  icon_url: string;
  checked: boolean;
  title: string;
  trackCount: number;
  handleItemChange(): void;
}
