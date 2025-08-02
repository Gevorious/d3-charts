import type { CardProps } from './types';
import './styles.scss';

const Card = ({ children, title, className = '' }: CardProps) => {
  return (
    <div className={`card ${className}`}>
      {title && <h2 className="title">{title}</h2>}
      <div className="content">{children}</div>
    </div>
  );
};

export default Card;
