import { mesh } from 'topojson-client';
import { max, min, scaleQuantize } from 'd3';

export function getGeoData(topology: any, countries: any) {
  if (!topology || !countries) return null;
  const interiors = mesh(
    topology,
    topology.objects.countries as any,
    (a: any, b: any) => a !== b,
  );
  return { countries, interiors };
}

export function getColorScale(
  data: any[],
  valueField: string,
  colorRange: string[],
) {
  const values = data.map((d) => +d[valueField]).filter((v) => !isNaN(v));
  if (!values.length) return null;

  return scaleQuantize<string>()
    .domain([min(values)!, max(values)!])
    .range(colorRange);
}

export function getDataMap(data: any[]) {
  const map = new Map();
  data.forEach((d) => {
    map.set(d.id, d);
  });
  return map;
}
