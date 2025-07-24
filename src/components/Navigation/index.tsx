import { NavLink } from 'react-router-dom';
import data from '../../data/navigation.json';
import './styles.scss';
import { NavItem } from './types';

const Navigation = () => {
  const { nav_items }: { nav_items: NavItem[] } = data;
  return (
    <nav className="nav">
      {nav_items.map(({ name, path }: NavItem) => (
        <NavLink
          key={name}
          to={path}
          className={({ isActive }) => (isActive ? 'active' : '')}
        >
          {name}
        </NavLink>
      ))}
    </nav>
  );
};

export default Navigation;
