import { useEffect, useState } from 'react';
import { BarChart } from '../../components/Charts';
import { CountryFilter } from '../../components/Charts/BarChart';
import FullscreenBox from '../../components/FullscreenBox';
import Card from '../../components/Card';
import type { CountryData } from '../../components/Charts/BarChart/types';
import { ascending, descending, json } from 'd3';
import { SortIcon } from '../../components/SortIcon';
import './styles.scss';

const sortBy = {
  asc: ascending,
  desc: descending,
};

const sortByLabel = {
  asc: 'Ascending',
  desc: 'Descending',
};

const BarChartPage = () => {
  const [data, setData] = useState<CountryData[]>([]);
  const [sortingType, setSortingType] = useState<'asc' | 'desc' | null>(null);
  const [selected, setSelected] = useState<string[]>([]);

  useEffect(() => {
    json<{ countries: CountryData[] }>(
      '/charts/data/population_by_country.json',
    ).then((res) => {
      setData(res!.countries);
      setSelected(res!.countries.map((d) => d.country));
    });
  }, []);

  const sortedData = sortingType
    ? data.sort((a, b) => sortBy[sortingType](a.population, b.population))
    : data;

  return (
    <div className="container">
      <Card title="Population by Country">
        <FullscreenBox fullScreenScale={1.2}>
          <div className="bar-chart">
            <div style={{ width: '100%', height: 'auto' }}>
              <BarChart data={sortedData} selected={selected} />
            </div>
            <div className="chart-info">
              <div className="sort">
                <span>
                  <SortIcon
                    direction={sortingType}
                    onClick={() =>
                      setSortingType((prev) =>
                        prev === 'asc' ? 'desc' : 'asc',
                      )
                    }
                  />
                </span>
                <span>
                  {sortingType ? sortByLabel[sortingType] : 'Unsorted'}
                </span>
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
        </FullscreenBox>
      </Card>
    </div>
  );
};

export default BarChartPage;
