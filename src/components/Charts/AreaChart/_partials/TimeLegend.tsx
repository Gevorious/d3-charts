import { TimeLegendProps } from '../types';

const TimeLegend = ({ range, handler, transform, active }: TimeLegendProps) => {
  return (
    <g transform={transform}>
      {range.map((r, i) => (
        <text
          key={r}
          className="legend"
          y={0}
          x={60 * i}
          fontWeight={active === r ? 900 : 400}
          onClick={() => handler(r)}
        >
          {r}
        </text>
      ))}
    </g>
  );
};

export default TimeLegend;
