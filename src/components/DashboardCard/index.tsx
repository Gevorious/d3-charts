import { Link } from 'react-router-dom';
import { DashboardCardProps } from './types';
import './styles.scss';

const DashboardCard = ({
  title,
  description,
  icon,
  to,
}: DashboardCardProps) => {
  return (
    <Link to={to} className="dashboard-card">
      <div className="dashboard-card-icon">{icon}</div>
      <div className="dashboard-card-title">{title}</div>
      <div className="dashboard-card-desc">{description}</div>
    </Link>
  );
};

export default DashboardCard;
