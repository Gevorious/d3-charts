import WorldMap from '../../components/WorldMap';
import GDPScatterPlot from './_partials/GDPScatterPlot';
import Card from '../../components/Card';
import { geoNaturalEarth1 } from 'd3';
import worldAtlas from 'world-atlas/countries-110m.json';
import type { Topology } from 'topojson-specification';
import { feature } from 'topojson-client';
import { WorldGeoData } from '../../components/WorldMap/types';
import { bubbleMapConfig } from './config';
import { useResizeObserver } from '@/hooks/useResizeObserver';
import './styles.scss';

const { width, height, margins } = bubbleMapConfig;

const innerHeight = height - (margins?.bottom || 0);

const BubbleMapPage = () => {
  const [containerRef, dimensions] = useResizeObserver<HTMLDivElement>();

  const topology = worldAtlas as unknown as Topology;
  const countries = feature(
    topology,
    topology.objects.countries,
  ) as WorldGeoData['countries'];
  const projection =
    dimensions &&
    geoNaturalEarth1().fitSize([dimensions.width, innerHeight], countries);

  return (
    <div className="container-large">
      <Card title="GDP per Capita(1975 - 2024)">
        <div ref={containerRef} className="bubble-map-page">
          {dimensions && (
            <svg width={dimensions.width} height={height}>
              <WorldMap
                projection={projection!}
                topology={topology}
                countries={countries}
              />
              <GDPScatterPlot
                projection={projection!}
                countries={countries}
                width={dimensions.width}
                height={height}
              />
            </svg>
          )}
        </div>
      </Card>
    </div>
  );
};

export default BubbleMapPage;
