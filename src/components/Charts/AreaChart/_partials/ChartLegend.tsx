import { ChartLegendProps } from '../types';

const ChartLegend = ({
  colorMap,
  visibleData,
  onToggle,
  width,
  margins,
}: ChartLegendProps) => {
  return (
    <g
      transform={`translate(${width - (margins?.right || 0)},${
        margins?.top || 0
      })`}
    >
      {Object.entries(colorMap).map(([key, value], index) => (
        <g
          key={key}
          transform={`translate(0,${24 * index})`}
          className="legend"
          onClick={() => onToggle(key)}
          opacity={visibleData.includes(key) ? 1 : 0.3}
        >
          <rect width={20} height={20} fill={value} />
          <text x={28} y={14} fontSize={12}>
            {key}
          </text>
        </g>
      ))}
    </g>
  );
};

export default ChartLegend;
