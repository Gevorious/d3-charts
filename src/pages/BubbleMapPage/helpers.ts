import { geoCentroid } from 'd3';
import { GDPScatterPlotProps } from './types';

export const getCoords = (countries: GDPScatterPlotProps['countries']) => {
  const map: Record<string, [number, number]> = {};

  countries.features.forEach((f) => {
    const code = f.id;
    const [lng, lat] = geoCentroid(f);
    if (code && lng && lat) {
      map[code] = [lng, lat];
    }
  });

  return map;
};
