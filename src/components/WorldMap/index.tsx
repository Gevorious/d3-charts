import { useMemo } from 'react';
import { geoPath, geoGraticule } from 'd3-geo';
import { mesh } from 'topojson-client';
import { WorldMapProps } from './types';
import './styles.scss';
import { max, min, scaleQuantize } from 'd3';
import { blueRange } from './constants';

const WorldMap = <T extends object>({
  projection,
  countries,
  topology,
  data,
  config,
}: WorldMapProps<T>) => {
  const graticule = useMemo(() => geoGraticule(), []);

  const geoData = useMemo(() => {
    if (!topology || !countries) return null;
    const interiors = mesh(
      topology,
      topology.objects.countries as any,
      (a: any, b: any) => a !== b,
    );
    return { countries, interiors };
  }, [topology, countries]);

  const colorScale = useMemo(() => {
    if (!data || !config) return null;
    const values = data
      .map((d: any) => +d[config.valueField])
      .filter((v) => !isNaN(v));
    if (!values.length) return null;
    return scaleQuantize<string>()
      .domain([min(values)!, max(values)!])
      .range(blueRange);
  }, [data, config]);

  const dataMap = useMemo(() => {
    if (!data) return null;
    const map = new Map();
    data.forEach((d: any) => {
      map.set(d.id, d);
    });
    return map;
  }, [data]);

  const pathGenerator = useMemo(() => geoPath(projection), [projection]);

  if (!geoData) return null;

  return (
    <g className="map">
      <path className="coord-sphere" d={pathGenerator({ type: 'Sphere' })!} />
      <path className="graticule" d={pathGenerator(graticule())!} />
      {geoData.countries.features.map((feature, i) => {
        const dataItem = dataMap?.get(feature.id);
        const value =
          dataItem && config?.valueField
            ? dataItem[config.valueField]
            : undefined;
        const color =
          colorScale && value !== undefined && value !== ''
            ? colorScale(+value)
            : '#d6d6d3';
        return (
          <path
            className="marks"
            key={i}
            d={pathGenerator(feature)!}
            fill={data ? color : '#d6d6d3'}
          >
            <title>
              {`${feature.properties?.name}: ${
                value === undefined || value === ''
                  ? 'N/A'
                  : '$' + Number(value).toFixed(2)
              }`}
            </title>
          </path>
        );
      })}
      <path className="interiors" d={pathGenerator(geoData.interiors)!} />
    </g>
  );
};

export default WorldMap;
