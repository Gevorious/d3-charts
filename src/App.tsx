import { useState } from 'react';
import Chart from './components/Chart';
import CountryFilter from './components/CountryFilter';
import type { CountryData } from './components/Chart/types';
import { useResizeObserver } from './hooks/useResizeObserver';
import { ascending, descending } from 'd3';
import { SortIcon } from './components/SortIcon';

const sampleData = [
  { country: 'Brazil', population: 212_812_405 },
  { country: 'USA', population: 347_275_807 },
  { country: 'Egypt', population: 118_365_995 },
  { country: 'China', population: 1_416_096_094 },
  { country: 'Iran', population: 92_417_681 },
  { country: 'Ukraine', population: 38_980_376 },
  { country: 'Germany', population: 84_075_075 },
  { country: 'India', population: 1_463_865_525 },
  { country: 'Canada', population: 40_126_723 },
  { country: 'France', population: 66_650_804 },
];

const sortBy = {
  asc: ascending,
  desc: descending,
};

const App = () => {
  const [data, setData] = useState<CountryData[]>(sampleData);
  const [containerRef, dimensions] = useResizeObserver<HTMLDivElement>();
  const [sortingType, setSortingType] = useState<'asc' | 'desc' | null>(null);
  const [selected, setSelected] = useState<string[]>(
    sampleData.map((d) => d.country),
  );

  const sortedData = sortingType
    ? data.sort((a, b) => sortBy[sortingType](a.population, b.population))
    : data;

  return (
    <div className="container">
      <div className="app">
        <h1>Population by Country - Chart</h1>
        <div ref={containerRef} style={{ width: '100%', height: 'auto' }}>
          {dimensions && (
            <Chart
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
    </div>
  );
};

export default App;
