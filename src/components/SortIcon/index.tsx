import { FaSort, FaSortUp, FaSortDown } from 'react-icons/fa';
import type { SortIconProps } from './types';
import './styles.scss';

const icons = {
  asc: <FaSortUp size={18} />,
  desc: <FaSortDown size={18} />,
};

export const SortIcon = ({ direction, onClick, className }: SortIconProps) => {
  const icon = direction ? icons[direction] : <FaSort size={18} />;

  return (
    <span onClick={onClick} className={`sort-icon ${className || ''}`}>
      {icon}
    </span>
  );
};
