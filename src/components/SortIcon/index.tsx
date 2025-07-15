import { FaSort, FaSortUp, FaSortDown } from 'react-icons/fa';
import type { SortIconProps } from './types';
import './styles.scss';

const icons = {
  asc: <FaSortUp size={24} />,
  desc: <FaSortDown size={24} />,
};

export const SortIcon = ({ direction, onClick, className }: SortIconProps) => {
  const icon = direction ? icons[direction] : <FaSort size={24} />;

  return (
    <span onClick={onClick} className={`sort-icon ${className || ''}`}>
      {icon}
    </span>
  );
};
