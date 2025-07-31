import { FeatureCollection, GeoJsonProperties, Geometry } from 'geojson';
import type { Topology } from 'topojson-specification';
import type { GeoProjection } from 'd3';
import { mesh } from 'topojson-client';

export type WorldGeoData = {
  countries: FeatureCollection<Geometry, GeoJsonProperties>;
  interiors: ReturnType<typeof mesh>;
};

export type MapData<T> = {
  data: T[];
  config: {
    valueField: keyof T;
    tooltipText?: string;
    showTooltip?: boolean;
  };
};

export type BaseProps = {
  projection: GeoProjection;
  topology: Topology;
  countries: WorldGeoData['countries'];
};

export type WorldMapProps<T = unknown> =
  | (BaseProps & MapData<T>)
  | (BaseProps & { data?: undefined; config?: undefined });
