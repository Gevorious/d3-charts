import { useState } from 'react';
import { BarChart } from '../../components/Charts';
import { CountryFilter } from '../../components/Charts/BarChart';
import Card from '../../components/Card';
import type { CountryData } from '../../components/Charts/BarChart/types';
import { useResizeObserver } from '../../hooks/useResizeObserver';
import { ascending, descending } from 'd3';
import { SortIcon } from '../../components/SortIcon';
import chartData from './chartData/bar_chart_data.json';
import './styles.scss';

const { countries }: { countries: CountryData[] } = chartData;

const sortBy = {
  asc: ascending,
  desc: descending,
};

const sortByLabel = {
  asc: 'Ascending',
  desc: 'Descending',
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
    <div className="container">
      <Card title="Population by Country">
        <div className="bar-chart">
          <div ref={containerRef} style={{ width: '100%', height: 'auto' }}>
            {dimensions && (
              <BarChart
                width={dimensions.width}
                data={sortedData}
                selected={selected}
              />
            )}
          </div>
          <div className="chart-info">
            <div className="sort">
              <span>
                <SortIcon
                  direction={sortingType}
                  onClick={() =>
                    setSortingType((prev) => (prev === 'asc' ? 'desc' : 'asc'))
                  }
                />
              </span>
              <span>{sortingType ? sortByLabel[sortingType] : 'Unsorted'}</span>
            </div>
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
        </div>
      </Card>
    </div>
  );
};

export default BarChartPage;
