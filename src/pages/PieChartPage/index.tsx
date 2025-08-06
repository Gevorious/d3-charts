import { json } from 'd3';
import { useEffect, useState } from 'react';
import { InternetUsersData } from './types';
import Card from '../../components/Card';
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
      <Card title="Internat Users Share By Region">
        {data.length ? (
          <PieChart
            data={data}
            keyField="region"
            width={1100}
            valueField="internet_users"
          />
        ) : null}
      </Card>
    </div>
  );
};

export default PieChartPage;
