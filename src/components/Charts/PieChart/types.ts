import { PieArcDatum, Arc as D3Arc } from 'd3';
import { ReactNode } from 'react';

type StringKeys<T> = {
  [K in keyof T]: T[K] extends string ? K : never;
}[keyof T];

type NumberKey<T> = {
  [K in keyof T]: T[K] extends number ? K : never;
}[keyof T];

export type PieChartProps<T> = {
  data: T[];
  keyField: StringKeys<T>;
  valueField: NumberKey<T>;
  width?: number;
  height?: number;
};

export type ChartCanvasProps = {
  width: number;
  height: number;
  children: ReactNode;
};

export type ListItemProps = {
  name: string;
  value: number;
  color: string;
  iconSize?: number;
  onClick: () => void;
  checked: boolean;
};

export type PieSlicesProps<T> = {
  arcs: PieArcDatum<T>[];
  arcEl: D3Arc<any, PieArcDatum<T>>;
  keyField: keyof T;
  colorByKey: Map<string, string>;
  total: number;
  radius: number;
  hoveredKey: string | null;
  onHover: (key?: string) => void;
};

export type LegendProps<T> = {
  data: T[];
  keyField: keyof T;
  valueField: keyof T;
  height: number;
  visibleItems: string[];
  colorByKey: Map<string, string>;
  onToggleItem: (key: string) => void;
  onHover: (key?: string) => void;
};

export type ArcProps<T> = {
  arc: D3Arc<any, PieArcDatum<T>>;
  arcDatum: PieArcDatum<T>;
  color: string;
  title: string;
};
