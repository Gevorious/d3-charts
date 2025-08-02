import { mesh } from 'topojson-client';
import { max, min, scaleQuantize, scaleThreshold } from 'd3';
import { thresholds } from './constants';

export function getGeoData(topology: any, countries: any) {
  if (!topology || !countries) return null;
  const interiors = mesh(
    topology,
    topology.objects.countries as any,
    (a: any, b: any) => a !== b,
  );
  return { countries, interiors };
}

export function getDataMap(data: any[]) {
  const map = new Map();
  data.forEach((d) => {
    map.set(d.id, d);
  });
  return map;
}
