type SortDirection = 'asc' | 'desc' | null;

export type SortIconProps = {
  direction: SortDirection;
  onClick?: () => void;
  className?: string;
};
