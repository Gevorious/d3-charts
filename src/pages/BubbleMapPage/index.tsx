import WorldMap from '../../components/WorldMap';
import GDPScatterPlot from './_partials/GDPScatterPlot';
import { geoNaturalEarth1 } from 'd3';
import worldAtlas from 'world-atlas/countries-110m.json';
import type { Topology } from 'topojson-specification';
import { feature } from 'topojson-client';
import { WorldGeoData } from '../../components/WorldMap/types';
import './styles.scss';

const width = 1400;
const height = 730;
const margins = {
  bottom: 50,
};

const innerHeight = height - margins.bottom;

const BubbleMapPage = () => {
  const topology = worldAtlas as unknown as Topology;
  const countries = feature(
    topology,
    topology.objects.countries,
  ) as WorldGeoData['countries'];
  const projection = geoNaturalEarth1().fitSize(
    [width, innerHeight],
    countries,
  );

  return (
    <div className="container-large">
      {/* <h1 className="page-title">GDP per Capita(1975 - 2024) - Chart</h1> */}
      <div className="bubble-map-page">
        <svg width={width} height={height}>
          <WorldMap
            projection={projection}
            topology={topology}
            countries={countries}
          />
          <GDPScatterPlot
            projection={projection}
            countries={countries}
            width={width}
            height={height - 20}
          />
        </svg>
      </div>
    </div>
  );
};

export default BubbleMapPage;
