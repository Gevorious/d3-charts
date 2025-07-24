import { WorldGeoData } from '../../components/WorldMap/types';
import { GeoProjection } from 'd3';

export type GDPScatterPlotProps = {
  projection: GeoProjection;
  countries: WorldGeoData['countries'];
  width: number;
  height: number;
};

export type GDPRow = {
  [year: string]: string;
  'Country Name': string;
  'Country Code': string;
};
