import { ScaleLinear, ScaleTime } from 'd3';

export type BottomAxisProps = {
  xScale: ScaleTime<number, number>;
  height: number;
  width: number;
};

export type LeftAxisProps = {
  yScale: ScaleLinear<number, number>;
  height: number;
  width: number;
};

export type LineShape = {
  key: string;
  path: string;
  color: string;
};

export type LinesProps = {
  lines: LineShape[];
};

export type Point = { time: number; price: number };
export type MultiLineData = Record<string, Point[]>;

export type MultiLineChartProps = {
  data: MultiLineData;
  width?: number;
  height?: number;
  colors?: Record<string, string>;
};

export type LineToggleProps = {
  label: string;
  color: string;
  checked: boolean;
  onChange: () => void;
  transform: string;
};

export type MarksProps = {
  xScale: ScaleTime<number, number>;
  yScale: ScaleLinear<number, number>;
  point: Point;
  color: string;
  title: string;
};
