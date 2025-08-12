import { LayoutProps } from './types';
import Navigation from '../Navigation';
import './styles.scss';
import { FaBan, FaMobileAlt } from 'react-icons/fa';

const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <div className="notification">
        <span className="notification-icons">
          <FaMobileAlt size={45} color="gray" />
          <FaBan size={45} color="red" className="ban-icon" />
        </span>
        <span>This app is only available for desktop screen size</span>
      </div>
      <div className="layout">
        <header className="header">
          <Navigation />
        </header>
        <main className="main">{children}</main>
        <footer className="footer">© 2025 Data Visualization</footer>
      </div>
    </>
  );
};

export default Layout;
