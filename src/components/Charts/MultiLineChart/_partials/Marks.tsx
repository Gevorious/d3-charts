import { MarksProps } from '../types';

const Marks = ({ xScale, point, yScale, color, title }: MarksProps) => {
  return (
    <circle
      cx={xScale(new Date(point.time))}
      cy={yScale(point.price)}
      r={3}
      fill={color}
    >
      <title>{title}</title>
    </circle>
  );
};

export default Marks;
