import worldAtlas from 'world-atlas/countries-110m.json';
import type { Topology } from 'topojson-specification';
import { feature } from 'topojson-client';
import { WorldGeoData } from '../../components/WorldMap/types';
import { csv, DSVRowArray, geoNaturalEarth1 } from 'd3';
import WorldMap from '../../components/WorldMap';
import { useEffect, useState } from 'react';
import YearSlider from '../../components/YearSlider';
import './styles.scss';

const width = 1400;
const height = 730;
const margins = {
  bottom: 50,
};

const innerHeight = height - margins.bottom;

const yearRange: [number, number] = [1975, 2024];

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
    csv('/charts/data/world_gdp_per_capita.csv').then((data) => {
      setData(data);
    });
  }, []);

  return (
    <div className="container-large">
      <div className="choropleth-map-page">
        <svg width={width} height={height + 20}>
          <WorldMap
            projection={projection}
            topology={topology}
            countries={countries}
            data={data ?? []}
            config={{ valueField: year?.toString()! }}
          />
          <YearSlider
            onChange={setYear}
            height={height}
            width={width}
            yearRange={yearRange}
            year={year || yearRange[1]}
          />
        </svg>
      </div>
    </div>
  );
};

export default ChoroplethMapPage;
