import { useEffect, useState } from 'react';
import { geoPath, geoGraticule } from 'd3-geo';
import { mesh } from 'topojson-client';
import { WorldGeoData, WorldMapProps } from './types';
import './styles.scss';

const WorldMap = ({ projection, countries, topology }: WorldMapProps) => {
  const [geoData, setGeoData] = useState<WorldGeoData | null>(null);
  const graticule = geoGraticule();

  useEffect(() => {
    const interiors = mesh(
      topology,
      topology.objects.countries as any,
      (a: any, b: any) => a !== b,
    );

    setGeoData({ countries, interiors });
  }, []);

  if (!geoData) return null;

  const pathGenerator = geoPath(projection);

  return (
    <g className="map">
      <path className="coord-sphere" d={pathGenerator({ type: 'Sphere' })!} />
      <path className="graticule" d={pathGenerator(graticule())!} />
      {geoData.countries.features.map((feature, i) => (
        <path className="marks" key={i} d={pathGenerator(feature)!} />
      ))}
      <path className="interiors" d={pathGenerator(geoData.interiors)!} />
    </g>
  );
};

export default WorldMap;
