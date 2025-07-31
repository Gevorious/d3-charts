import DashboardCard from '../../components/DashboardCard';
import { FaChartBar, FaGlobeEurope, FaMapMarkedAlt } from 'react-icons/fa';
import './styles.scss';
import { dashboardItems } from './dashboardData';

const icons = {
  mapMarked: <FaMapMarkedAlt size={32} />,
  barChart: <FaChartBar size={32} />,
  globeEurope: <FaGlobeEurope size={32} />,
};

const Home = () => {
  return (
    <div className="dashboard-container">
      <h1 className="page-title">Dashboard</h1>
      <div className="dashboard-grid">
        {dashboardItems.map(({ url, icon, ...rest }) => (
          <DashboardCard
            key={rest.title}
            to={url}
            icon={icons[icon as keyof typeof icons]}
            {...rest}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
