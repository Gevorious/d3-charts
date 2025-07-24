import { csv, DSVRowArray, geoCentroid } from 'd3';
import { useEffect, useState } from 'react';
import { GDPScatterPlotProps } from '../types';
import YearSlider from './YearSlider';

const getCoords = (countries: GDPScatterPlotProps['countries']) => {
  const map: Record<string, [number, number]> = {};

  countries.features.forEach((f) => {
    const code = f.id;
    const [lng, lat] = geoCentroid(f);
    if (code && lng && lat) {
      map[code] = [lng, lat];
    }
  });

  return map;
};

const yearRange: [number, number] = [1975, 2024];

const GDPScatterPlot = ({
  projection,
  countries,
  width,
  height,
}: GDPScatterPlotProps) => {
  const [data, setData] = useState<DSVRowArray<string>>();
  const [year, setYear] = useState<number | null>(null);

  useEffect(() => {
    csv('/charts/data/world_gdp_per_capita.csv').then((data) => {
      setData(data);
    });
  }, []);

  if (!data) return null;

  const coords = getCoords(countries);

  return (
    <>
      <g className="scatter-plot">
        {data.map((d) => {
          const code = d.id;
          const value = parseFloat(d[year || yearRange[1]]);
          const center = coords[code];

          if (!center) return null;

          const [x, y] = projection(center)!;
          let r = Math.sqrt(value || 3000) * 0.06;

          const tooltip = `${d['Country Name']}: ${
            isNaN(value) ? 'N/A' : '$' + value.toFixed(2)
          }`;

          return (
            <circle
              key={code}
              cx={x}
              cy={y}
              r={r}
              className={`mark ${isNaN(value) ? 'no-data' : ''}`}
            >
              <title>{tooltip}</title>
            </circle>
          );
        })}
      </g>
      <YearSlider
        onChange={setYear}
        height={height}
        width={width}
        yearRange={yearRange}
        year={year || yearRange[1]}
      />
    </>
  );
};

export default GDPScatterPlot;
