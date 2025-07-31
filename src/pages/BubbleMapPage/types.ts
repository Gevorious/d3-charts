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

export type BubbleMapConfig = {
  width: number;
  height: number;
  margins?: {
    bottom?: number;
    top?: number;
    left?: number;
    right?: number;
  };
  yearRange: [number, number];
};
