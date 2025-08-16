import { ScaleLinear, ScaleTime } from 'd3';
import { ReactNode } from 'react';

export type Configs<T> = {
  height?: number;
  width?: number;
  valueKeys: (keyof T)[];
  xKey: keyof T;
  margins?: {
    left?: number;
    top?: number;
    bottom?: number;
    right?: number;
  };
  yAxisTitle?: string;
  xAxisTitle?: string;
};

export type AreaPathsProps<T> = {
  data: T[];
  sortedValues: (keyof T)[];
  xKey: keyof T;
  xScale: ScaleTime<number, number>;
  yScale: ScaleLinear<number, number>;
  colorMap: Record<string, string>;
};

type TimeLegends = {
  range: number[];
  handler: (year: number) => void;
  active: number | string;
};

export type TimeLegendProps = {
  transform: string;
} & TimeLegends;

export type AreaChartProps<T> = {
  data: T[];
  config: Configs<T>;
  timeLegends: TimeLegends;
};

export type BottomAxisProps = {
  xScale: ScaleTime<number, number>;
  height: number;
  width: number;
  title?: string;
};

export type LeftAxisProps = {
  yScale: ScaleLinear<number, number>;
  height: number;
  width: number;
  title?: string;
};

export type ChartContainerProps = {
  width: number;
  height: number;
  margins?: {
    left?: number;
    top?: number;
    bottom?: number;
    right?: number;
  };
  children: ReactNode;
};

export type ChartLegendProps = {
  colorMap: Record<string, string>;
  visibleData: string[];
  onToggle: (key: string) => void;
  width: number;
  margins?: {
    right?: number;
    top?: number;
  };
};

export type ScalesProps<T> = {
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
