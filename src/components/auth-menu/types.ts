export interface MenuItemType {
  key: string;
  path: string;
  icon: unknown;
  label: string;
  children: null | MenuItemType[];
  authorities?: string[];
}
