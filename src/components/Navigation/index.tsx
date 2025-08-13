import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import data from '../../data/navigation.json';
import { NavItem } from './types';
import './styles.scss';

const Navigation = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const { nav_items }: { nav_items: NavItem[] } = data;

  return (
    <nav className="nav">
      {nav_items.map(({ name, path, children }: NavItem, idx) => {
        const hasChildren = Array.isArray(children) && children.length > 0;

        return (
          <div
            key={name}
            className={`nav-item ${hasChildren ? 'has-children' : ''}`}
            onMouseEnter={() => hasChildren && setOpenIndex(idx)}
            onMouseLeave={() => hasChildren && setOpenIndex(null)}
          >
            {path && !hasChildren ? (
              <NavLink
                to={path}
                className={({ isActive }) => (isActive ? 'active' : '')}
              >
                {name}
              </NavLink>
            ) : (
              <span className="nav-label">{name}</span>
            )}
            {hasChildren && (
              <div className={`dropdown ${openIndex === idx ? 'show' : ''}`}>
                {children.map((child) => (
                  <span className="dropdown-item">
                    <NavLink
                      key={child.name}
                      to={child.path!}
                      className={({ isActive }) => (isActive ? 'active' : '')}
                    >
                      {child.name}
                    </NavLink>
                  </span>
                ))}
              </div>
            )}
          </div>
        );
      })}
    </nav>
  );
};

export default Navigation;
