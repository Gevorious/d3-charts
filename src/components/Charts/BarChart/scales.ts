import { scaleBand, scaleLinear } from 'd3-scale';
import { max } from 'd3-array';
import type { CountryData } from '../BarChart/types';

export function getScales(data: CountryData[], width: number, height: number) {
  const padding = 0.1;

  const xScale = scaleBand()
    .domain(data.map((d) => d.country))
    .rangeRound([0, width])
    .padding(padding);

  const yScale = scaleLinear()
    .domain([0, max(data, (d) => d.population) ?? 1])
    .range([height, 0])
    .nice();

  return { xScale, yScale };
}
