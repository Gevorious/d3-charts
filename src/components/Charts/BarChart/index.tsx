import Mark from './_partials/Mark';
import Gradient from './_partials/Gradient';
import BottomAxis from './_partials/BottomAxis';
import LeftAxis from './_partials/LeftAxis';
import { getScales } from './scales';
import type { BarChartProps } from './types';
import './styles.scss';
import Filter from './_partials/Filter';

const margins = { bottom: 60, top: 20, left: 40, right: 40 };

const BarChart = ({
  data,
  width = 800,
  height = 600,
  selected,
}: BarChartProps) => {
  const innerWidth = width - margins.left - margins.right;
  const innerHeight = height - margins.top - margins.bottom;

  const { xScale, yScale } = getScales(data, innerWidth, innerHeight);

  return (
    <svg className="main-container" width={width} height={height}>
      <g transform={`translate(${margins.left}, ${margins.top})`}>
        <BottomAxis xScale={xScale} height={innerHeight} selected={selected} />
        <LeftAxis yScale={yScale} innerWidth={innerWidth} />
        <g>
          {data.map((d) => (
            <Mark
              key={d.country}
              x={xScale(d.country) || 0}
              y={yScale(d.population)}
              width={xScale.bandwidth()}
              height={innerHeight - yScale(d.population)}
              tooltip={d.population.toLocaleString()}
              show={selected.includes(d.country)}
            />
          ))}
        </g>
        <Gradient />
      </g>
    </svg>
  );
};

export const CountryFilter = Filter;

export default BarChart;
