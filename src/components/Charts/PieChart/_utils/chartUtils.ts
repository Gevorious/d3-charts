import { PieArcDatum, Arc as D3Arc } from 'd3';

export const calculateRadius = (width: number, height: number): number => {
  return Math.min(width, height) / 2.2;
};

export const calculatePercentage = (value: number, total: number): string => {
  return ((value / total) * 100).toFixed(1);
};

export const calculateHoverOffset = (
  arcDatum: PieArcDatum<any>,
  arcEl: D3Arc<any, PieArcDatum<any>>,
  radius: number,
  hoveredKey: string | null,
  currentKey: string,
): { dx: number; dy: number } => {
  const [cx, cy] = arcEl.centroid(arcDatum);
  const offset = hoveredKey === currentKey ? 15 : 0;

  return {
    dx: cx * (offset / radius),
    dy: cy * (offset / radius),
  };
};

export const calculateIconSize = (
  height: number,
  dataLength: number,
): number => {
  return (height - 60) / dataLength / 1.2;
};
