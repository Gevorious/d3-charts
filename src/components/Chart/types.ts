import type { ScaleBand, ScaleLinear } from 'd3';

export type CountryData = {
  country: string;
  population: number;
};

export type ChartProps = {
  data: CountryData[];
  width?: number;
  height?: number;
  selected: string[];
};

export type MarkProps = {
  x: number;
  y: number;
  height: number;
  width: number;
  tooltip: string;
  show: boolean;
};

export type BottomAxisProps = {
  selected: ChartProps['selected'];
  height: number;
  xScale: ScaleBand<string>;
};

export type LeftAxisProps = {
  yScale: ScaleLinear<number, number>;
  innerWidth: number;
};

export type Margins = {
  top: number;
  bottom: number;
  left: number;
  right: number;
};
