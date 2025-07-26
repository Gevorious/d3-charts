import DashboardCard from '../../components/DashboardCard';
import { FaChartBar, FaGlobeEurope, FaMapMarkedAlt } from 'react-icons/fa';
import './styles.scss';

const dashboardItems = [
  {
    title: 'GDP per Capita - Bubble Map',
    description: 'Explore world countries GDP per capita on a bubble map',
    icon: <FaMapMarkedAlt size={32} />,
    url: '/bubble-map',
  },
  {
    title: 'Population Chart',
    description: 'Compare populations of countries',
    icon: <FaChartBar size={32} />,
    url: '/bar-chart',
  },
  {
    title: 'GDP per Capita - Choropleth Map',
    description: 'Explore world countries GDP per capita on a choropleth map',
    icon: <FaGlobeEurope size={32} />,
    url: '/choropleth-map',
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
