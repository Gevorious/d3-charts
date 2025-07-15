import { format as d3format } from 'd3-format';
import type { LeftAxisProps } from '../types';

const LeftAxis = ({ yScale, innerWidth }: LeftAxisProps) => {
  const ticks = yScale.ticks(12);
  const format = d3format('~s');

  return (
    <g className="axis">
      <line x1={0} x2={0} y1={yScale.range()[0]} y2={yScale.range()[1]} />
      {ticks.map((tick, i) => {
        const y = yScale(tick);
        return (
          <g key={i} transform={`translate(0, ${y})`}>
            <line className="tick" x2={-6} x1={innerWidth} />
            <text x={-9} dy="0.32em" textAnchor="end" fontSize={10}>
              {format(tick).replace('G', 'B')}
            </text>
          </g>
        );
      })}
    </g>
  );
};

export default LeftAxis;
