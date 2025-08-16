import { timeFormat } from 'd3';
import { BottomAxisProps } from '../types';

const BottomAxis = ({ xScale, height, width }: BottomAxisProps) => {
  const xTicks = xScale.ticks(12);
  return (
    <>
      <line x1={0} y1={height} x2={width} y2={height} stroke="#999" />
      {xTicks.map((d, i) => (
        <g key={i} transform={`translate(${xScale(d)},${height})`}>
          <line y1={6} y2={-height} className="tick" />
          <text y={15} textAnchor="start" fontSize={10} fill="#333">
            {timeFormat('%m/%Y')(d)}
          </text>
        </g>
      ))}
    </>
  );
};

export default BottomAxis;
