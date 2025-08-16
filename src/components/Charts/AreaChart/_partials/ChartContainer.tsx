import { ChartContainerProps } from '../types';

const ChartContainer = ({
  width,
  height,
  margins,
  children,
}: ChartContainerProps) => {
  return (
    <svg width={width} height={height}>
      <g transform={`translate(${margins?.left || 0},${margins?.top || 0})`}>
        {children}
      </g>
    </svg>
  );
};

export default ChartContainer;
