import { useState } from 'react';
import { BarChart } from '@components/Charts';
import CountryFilter from '@components/Charts/BarChart/_partials/CountryFilter';
import type { CountryData } from '@components/Charts/BarChart/types';
import { useResizeObserver } from '@hooks/useResizeObserver';
import { ascending, descending } from 'd3';
import { SortIcon } from '@components/SortIcon';
import './styles.scss';
import chartData from './chartData/bar_chart_data.json';

const { countries }: { countries: CountryData[] } = chartData;

const sortBy = {
  asc: ascending,
  desc: descending,
};

const BarChartPage = () => {
  const [data, setData] = useState<CountryData[]>(countries);
  const [containerRef, dimensions] = useResizeObserver<HTMLDivElement>();
  const [sortingType, setSortingType] = useState<'asc' | 'desc' | null>(null);
  const [selected, setSelected] = useState<string[]>(
    countries.map((d) => d.country),
  );

  const sortedData = sortingType
    ? data.sort((a, b) => sortBy[sortingType](a.population, b.population))
    : data;

  return (
    <div className="container bar-chart">
      <h1 className="page-title">Population by Country - Chart</h1>
      <div ref={containerRef} style={{ width: '100%', height: 'auto' }}>
        {dimensions && (
          <BarChart
            width={dimensions.width}
            data={sortedData}
            selected={selected}
          />
        )}
      </div>
      <SortIcon
        direction={sortingType}
        onClick={() =>
          setSortingType((prev) => (prev === 'asc' ? 'desc' : 'asc'))
        }
      />
      <CountryFilter
        onChange={(selectedCountries) => {
          setSelected(selectedCountries);
        }}
        countries={sortedData}
        selected={selected}
        addNewRow={(data: CountryData) => {
          setData((prev) => [...prev, data]);
          setSelected((prev) => [...prev, data.country]);
        }}
      />
    </div>
  );
};

export default BarChartPage;
