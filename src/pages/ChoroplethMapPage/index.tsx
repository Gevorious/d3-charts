import worldAtlas from 'world-atlas/countries-110m.json';
import Card from '../../components/Card';
import YearSlider from '../../components/YearSlider';
import type { Topology } from 'topojson-specification';
import { feature } from 'topojson-client';
import { WorldGeoData } from '../../components/WorldMap/types';
import { csv, DSVRowArray, format, geoNaturalEarth1 } from 'd3';
import WorldMap from '../../components/WorldMap';
import { useEffect, useState } from 'react';
import { choroplethConfig } from './config';
import './styles.scss';
import { customFormat } from './helpers';
import { useResizeObserver } from '@/hooks/useResizeObserver';

const { width, height, margins, yearRange } = choroplethConfig;

const innerHeight = height - (margins?.bottom || 0);

const ChoroplethMapPage = () => {
  const [data, setData] = useState<DSVRowArray<string>>();
  const [year, setYear] = useState<number>(yearRange[1]);
  const [containerRef, dimensions] = useResizeObserver<HTMLDivElement>();

  const topology = worldAtlas as unknown as Topology;
  const countries = feature(
    topology,
    topology.objects.countries,
  ) as WorldGeoData['countries'];
  const projection =
    dimensions &&
    geoNaturalEarth1().fitSize([dimensions.width, innerHeight], countries);

  useEffect(() => {
    csv('/charts/data/world_countries_gdp.csv').then((data) => {
      setData(data);
    });
  }, []);

  return (
    <div className="container-large">
      <Card title="GDP of Countries(1980 - 2030)">
        <div ref={containerRef} className="choropleth-map-page">
          {dimensions && (
            <svg width={dimensions.width} height={height}>
              <WorldMap
                projection={projection!}
                topology={topology}
                countries={countries}
                data={data ?? []}
                config={{
                  valueField: year?.toString()!,
                  showTooltip: true,
                  valueFormatter: customFormat,
                }}
              />
              <YearSlider
                onChange={setYear}
                height={height - 20}
                width={dimensions.width}
                yearRange={yearRange}
                year={year || yearRange[1]}
              />
            </svg>
          )}
        </div>
      </Card>
    </div>
  );
};

export default ChoroplethMapPage;
