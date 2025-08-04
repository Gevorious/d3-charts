import { useMemo } from 'react';
import { extent, scaleLinear, scaleTime } from 'd3';
import { Point } from '../types';

export const useScales = (
  allPoints: Point[],
  innerWidth: number,
  innerHeight: number,
) => {
  const now = new Date();
  const start = new Date(now.getTime() - 5 * 60 * 1000);

  const xScale = useMemo(() => {
    return scaleTime().domain([start, now]).range([0, innerWidth]);
  }, [allPoints, innerWidth]);

  const yExtent = extent(allPoints, (d) => d.price) as [number, number];
  const padding = (yExtent[1] - yExtent[0]) * 0.05;

  const yScale = useMemo(() => {
    return scaleLinear()
      .domain([yExtent[0] - padding, yExtent[1] + padding])
      .range([innerHeight, 0]);
  }, [yExtent, innerHeight]);

  return { xScale, yScale };
};
