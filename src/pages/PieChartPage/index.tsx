import FullscreenBox from '../../components/FullscreenBox';
import Card from '../../components/Card';
import { json } from 'd3';
import { useEffect, useState } from 'react';
import { InternetUsersData } from './types';
import { PieChart } from '../../components/Charts';

const PieChartPage = () => {
  const [data, setData] = useState<InternetUsersData[]>([]);

  useEffect(() => {
    json<{ data: InternetUsersData[] }>(
      '/charts/data/internet_users_by_region.json',
    ).then((res) => setData(res!.data));
  }, []);

  return (
    <div className="container">
      <FullscreenBox fullScreenScale={1.2}>
        <Card title="Internat Users Share By Region">
          {data.length ? (
            <PieChart
              data={data}
              keyField="region"
              valueField="internet_users"
            />
          ) : null}
        </Card>
      </FullscreenBox>
    </div>
  );
};

export default PieChartPage;
