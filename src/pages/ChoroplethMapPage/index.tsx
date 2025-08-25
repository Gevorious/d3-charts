import worldAtlas from 'world-atlas/countries-110m.json';
import Card from '../../components/Card';
import YearSlider from '../../components/YearSlider';
import WorldMap from '../../components/WorldMap';
import FullscreenBox from '../../components/FullscreenBox';
import type { Topology } from 'topojson-specification';
import { feature } from 'topojson-client';
import { WorldGeoData } from '../../components/WorldMap/types';
import { csv, DSVRowArray, geoNaturalEarth1 } from 'd3';
import { useEffect, useState } from 'react';
import { choroplethConfig } from './config';
import { customFormat } from './helpers';
import './styles.scss';

const { width, height, margins, yearRange } = choroplethConfig;

const innerHeight = height - (margins?.bottom || 0);

const ChoroplethMapPage = () => {
  const [data, setData] = useState<DSVRowArray<string>>();
  const [year, setYear] = useState<number>(yearRange[1]);

  const topology = worldAtlas as unknown as Topology;
  const countries = feature(
    topology,
    topology.objects.countries,
  ) as WorldGeoData['countries'];
  const projection = geoNaturalEarth1().fitSize(
    [width, innerHeight],
    countries,
  );

  useEffect(() => {
    csv('/charts/data/world_countries_gdp.csv').then((data) => {
      setData(data);
    });
  }, []);

  return (
    <div className="container-large">
      <FullscreenBox fullScreenScale={1.2}>
        <Card title="GDP of Countries(1980 - 2030)">
          <div className="choropleth-map-page">
            <svg width={width} height={height}>
              <WorldMap
                data={data ?? []}
                projection={projection!}
                topology={topology}
                countries={countries}
                config={{
                  valueField: year?.toString()!,
                  showTooltip: true,
                  valueFormatter: customFormat,
                }}
              />
              <YearSlider
                onChange={setYear}
                height={height - 20}
                width={width}
                yearRange={yearRange}
                year={year || yearRange[1]}
              />
            </svg>
          </div>
        </Card>
      </FullscreenBox>
    </div>
  );
};

export default ChoroplethMapPage;
