import { useMemo } from 'react';
import { curveMonotoneX, line } from 'd3';
import { Point } from '../types';

export const useLines = (
  data: Record<string, Point[]>,
  xScale: (d: Date) => number,
  yScale: (n: number) => number,
  colorMap: Record<string, string>,
) => {
  return useMemo(() => {
    return Object.keys(data).map((key) => {
      const lineGen = line<Point>()
        .x((d) => xScale(new Date(d.time)))
        .y((d) => yScale(d.price))
        .curve(curveMonotoneX);

      return {
        key,
        path: lineGen(data[key])!,
        color: colorMap[key],
      };
    });
  }, [data, xScale, yScale, colorMap]);
};
