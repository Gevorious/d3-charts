import { useEffect, useMemo, useState } from 'react';
import Card from '../../components/Card';
import FullscreenBox from '../../components/FullscreenBox';
import { config } from './config';
import { csv } from 'd3';
import { AreaChart } from '../../components/Charts';
import { StockRow } from './types';
import './styles.scss';

const AreaChartPage = () => {
  const [data, setData] = useState<StockRow[]>();
  const [activeYear, setActiveYear] = useState<number>();

  useEffect(() => {
    csv('/charts/data/SP-500-stock-5y.csv', (row) => {
      return {
        Date: new Date(row.Date),
        SP500: +row.SP500,
        Dividend: +row.Dividend,
        Earnings: +row.Earnings,
        ['Real Price']: +row['Real Price'],
      };
    }).then((res) => {
      const sorted = [...res].sort(
        (a, b) => a.Date.getTime() - b.Date.getTime(),
      );
      setActiveYear(new Date(sorted[0].Date).getFullYear());
      setData(sorted);
    });
  }, []);

  const dataByYear = useMemo(
    () =>
      data?.filter((item) => new Date(item.Date).getFullYear() === activeYear),
    [data, activeYear],
  );

  const range = useMemo(
    () => [...new Set(data?.map((item) => new Date(item.Date).getFullYear()))],
    [data],
  );

  return (
    <div className="container">
      <FullscreenBox fullScreenScale={1.2}>
        <Card title="SP500 stock market dynamics(2018 - 2023)">
          {data && activeYear && (
            <AreaChart
              data={dataByYear!}
              config={config}
              timeLegends={{
                range,
                handler: setActiveYear,
                active: activeYear,
              }}
            />
          )}
        </Card>
      </FullscreenBox>
    </div>
  );
};

export default AreaChartPage;
