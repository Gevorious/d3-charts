import { useMemo } from 'react';
import { geoPath, geoGraticule } from 'd3-geo';
import { WorldMapProps } from './types';
import { getGeoData, getColorScale, getDataMap } from './helpers';
import { blueRange } from './constants';
import { Feature, Geometry } from 'geojson';
import './styles.scss';

const WorldMap = <T extends object>({
  projection,
  countries,
  topology,
  data,
  config,
}: WorldMapProps<T>) => {
  const graticule = useMemo(() => geoGraticule(), []);

  const geoData = useMemo(
    () => getGeoData(topology, countries),
    [topology, countries],
  );

  const colorScale = useMemo(() => {
    if (!data || !config) return null;
    return getColorScale(data, config.valueField as string, blueRange);
  }, [data, config]);

  const dataMap = useMemo(() => (data ? getDataMap(data) : null), [data]);

  const pathGenerator = useMemo(() => geoPath(projection), [projection]);

  if (!geoData) return null;

  return (
    <g className="map">
      <path className="coord-sphere" d={pathGenerator({ type: 'Sphere' })!} />
      <path className="graticule" d={pathGenerator(graticule())!} />
      {geoData.countries.features.map((feature: Feature<Geometry, any>) => {
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
            key={feature.id || feature.properties.name}
            d={pathGenerator(feature)!}
            fill={data ? color : '#d6d6d3'}
          >
            {config?.showTooltip && (
              <title>
                {config?.tooltipText ||
                  `${feature.properties?.name}: ${
                    value === undefined || value === ''
                      ? 'N/A'
                      : '$' + Number(value).toFixed(2)
                  }`}
              </title>
            )}
          </path>
        );
      })}
      <path className="interiors" d={pathGenerator(geoData.interiors)!} />
    </g>
  );
};

export default WorldMap;
