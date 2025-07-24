import DashboardCard from '../../components/DashboardCard';
import { FaChartBar, FaMapMarkedAlt } from 'react-icons/fa';
import './styles.scss';

const dashboardItems = [
  {
    title: 'GDP Map',
    description: 'Explore GDP per capita on a world map',
    icon: <FaMapMarkedAlt size={32} />,
    url: '/choropleth-map',
  },
  {
    title: 'Population Chart',
    description: 'Compare populations of countries',
    icon: <FaChartBar size={32} />,
    url: '/bar-chart',
  },
];

const Home = () => {
  return (
    <div className="dashboard-container">
      <h1 className="page-title">Dashboard</h1>
      <div className="dashboard-grid">
        {dashboardItems.map(({ url, ...rest }) => (
          <DashboardCard key={rest.title} to={url} {...rest} />
        ))}
      </div>
    </div>
  );
};

export default Home;
