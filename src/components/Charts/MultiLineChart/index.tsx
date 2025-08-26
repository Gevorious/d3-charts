import React, { useMemo, useState } from 'react';
import BottomAxis from './_partials/BottomAxis';
import LeftAxis from './_partials/LeftAxis';
import Lines from './_partials/Lines';
import { MultiLineChartProps } from './types';
import LineToggle from './_partials/LIneToggle';
import Marks from './_partials/Marks';
import { useColorMap } from '../../../hooks/useColorMap';
import { useScales } from './_hooks/useScales';
import { useLines } from './_hooks/useLines';
import './styles.scss';

const margin = { top: 20, right: 240, bottom: 30, left: 60 };

const MultiLineChart = ({
  data,
  width = 800,
  height = 600,
  colors = {},
}: MultiLineChartProps) => {
  const [visibleLines, setVisibleLines] = useState<string[]>(Object.keys(data));
  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;

  const filteredData = Object.fromEntries(
    Object.entries(data).filter(([key]) => visibleLines.includes(key)),
  );

  const allPoints = useMemo(
    () => Object.values(filteredData).flat(),
    [filteredData],
  );

  const colorMap = useColorMap(data, colors);
  const { xScale, yScale } = useScales(allPoints, innerWidth, innerHeight);
  const lines = useLines(filteredData, xScale, yScale, colorMap);

  return (
    <svg width={width} height={height}>
      <defs>
        <clipPath id="chart-clip">
          <rect x="0" y="0" width={innerWidth} height={innerHeight} />
        </clipPath>
      </defs>
      <g
        transform={`translate(${margin.left + innerWidth + 80}, ${
          margin.top + 50
        })`}
        className="line-toggle"
      >
        {Object.entries(data).map(([key], i) => (
          <LineToggle
            key={key}
            transform={`translate(0, ${i * 30})`}
            label={key}
            color={colorMap[key]}
            onChange={() =>
              setVisibleLines((prev) =>
                prev.includes(key)
                  ? prev.filter((line) => line !== key)
                  : [...prev, key],
              )
            }
            checked={visibleLines.includes(key)}
          />
        ))}
      </g>
      <g transform={`translate(${margin.left},${margin.top})`}>
        <LeftAxis yScale={yScale} height={innerHeight} width={innerWidth} />
        <BottomAxis xScale={xScale} height={innerHeight} width={innerWidth} />
        <g clipPath="url(#chart-clip)">
          <Lines lines={lines} />
          {Object.entries(filteredData).map(([key, points], i) => (
            <g key={key}>
              {points.map((point, j) => (
                <Marks
                  key={j}
                  xScale={xScale}
                  yScale={yScale}
                  point={point}
                  color={colorMap[key]}
                  title={`${key.toUpperCase()}: $${point.price}`}
                />
              ))}
            </g>
          ))}
        </g>
      </g>
    </svg>
  );
};

export default React.memo(MultiLineChart);
