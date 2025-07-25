import { LayoutProps } from './types';
import Navigation from '../Navigation';
import './styles.scss';

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="layout">
      <header className="header">
        <Navigation />
      </header>
      <main className="main">{children}</main>
      <footer className="footer">© 2025 Data Visualization</footer>
    </div>
  );
};

export default Layout;
