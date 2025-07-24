import { FeatureCollection, GeoJsonProperties, Geometry } from 'geojson';
import type { Topology } from 'topojson-specification';
import type { GeoProjection } from 'd3';
import { mesh } from 'topojson-client';

export type WorldGeoData = {
  countries: FeatureCollection<Geometry, GeoJsonProperties>;
  interiors: ReturnType<typeof mesh>;
};

export type WorldMapProps = {
  projection: GeoProjection;
  topology: Topology;
  countries: WorldGeoData['countries'];
};
