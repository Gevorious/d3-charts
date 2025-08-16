import { Configs } from '../../components/Charts/AreaChart/types';
import { StockRow } from './types';

export const config: Configs<StockRow> = {
  width: 1100,
  height: 600,
  valueKeys: ['SP500', 'Dividend', 'Earnings', 'Real Price'],
  xKey: 'Date',
  margins: {
    left: 90,
    bottom: 80,
    right: 200,
  },
  yAxisTitle: 'Stock price in USD',
};
