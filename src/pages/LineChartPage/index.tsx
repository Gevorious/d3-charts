import { useEffect, useState } from 'react';
import { webSocketHandler } from './websocket';
import { CryptoType, PricesByAsset, SocketData } from './types';
import { useResizeObserver } from '@/hooks/useResizeObserver';
import { MultiLineChart } from '../../components/Charts';
import Card from '../../components/Card';
import './styles.scss';

const CRYPTO_URL =
  'wss://stream.binance.com:9443/stream?streams=btcusdt@trade/ethusdt@trade/avaxusdt@trade/bnbusdt@trade/solusdt@trade';

const LineChartPage = () => {
  const [prices, setPrices] = useState<PricesByAsset>({
    ['BTC/USDT']: [],
    ['ETH/USDT']: [],
    ['AVAX/USDT']: [],
    ['BNB/USDT']: [],
    ['SOL/USDT']: [],
  });

  const [containerRef, dimensions] = useResizeObserver<HTMLDivElement>();

  useEffect(() => {
    const socket = webSocketHandler(CRYPTO_URL, (data: SocketData) => {
      setPrices((prev) => {
        const next = { ...prev };
        for (const key in data) {
          const asset = key.replace('USDT', '/USDT') as CryptoType;
          const newEntry = { time: Date.now(), price: data[key as CryptoType] };
          const updatedArray = [...next[asset], newEntry];
          next[asset] =
            updatedArray.length > 100
              ? updatedArray.slice(updatedArray.length - 100)
              : updatedArray;
        }
        return next;
      });
    });

    return () => {
      if (socket && socket.readyState === WebSocket.OPEN) {
        socket.close();
      }
    };
  }, []);

  return (
    <div className="container">
      <Card title="Real Time Crypto Currency Rates">
        <div ref={containerRef} style={{ width: '100%', height: 'auto' }}>
          {dimensions && (
            <MultiLineChart data={prices} width={dimensions.width} />
          )}
        </div>
      </Card>
    </div>
  );
};

export default LineChartPage;
