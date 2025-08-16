import { extent, max, scaleLinear, scaleTime } from 'd3';

export type ChartScalesProps<T> = {
  data: T[];
  config: {
    width?: number;
    height?: number;
    margins?: {
      left?: number;
      top?: number;
      bottom?: number;
      right?: number;
    };
    valueKeys: (keyof T)[];
    xKey: keyof T;
  };
  visibleData: (keyof T)[];
};

export const useChartScales = <T extends Record<string, any>>({
  data,
  config,
  visibleData,
}: ChartScalesProps<T>) => {
  const { width = 800, height = 600, margins, valueKeys, xKey } = config;

  const innerHeight = height - (margins?.top || 0) - (margins?.bottom || 0);
  const innerWidth = width - (margins?.left || 0) - (margins?.right || 0);

  const xDomain = extent(data, (d) => d[xKey] as Date) as [Date, Date];
  const yMax =
    max(data, (d) => Math.max(...visibleData.map((value) => +d[value]))) ?? 0;

  const xScale = scaleTime().domain(xDomain).range([0, innerWidth]);
  const yScale = scaleLinear()
    .domain([0, yMax + 1000])
    .range([innerHeight, 0]);

  const sortedValues = [...visibleData].sort((a, b) => {
    const maxA = max(data, (d) => +d[a]) ?? 0;
    const maxB = max(data, (d) => +d[b]) ?? 0;
    return maxB - maxA;
  });

  return {
    xScale,
    yScale,
    sortedValues,
    innerWidth,
    innerHeight,
  };
};
