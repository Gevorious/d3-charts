import { useEffect, useState } from 'react';
import { webSocketHandler } from './websocket';
import Card from '../../components/Card';
import FullscreenBox from '../../components/FullscreenBox';
import { CryptoType, PricesByAsset, SocketData } from './types';
import { MultiLineChart } from '../../components/Charts';
import { config } from './config';
import './styles.scss';

const { width } = config;

const CRYPTO_URL =
  'wss://stream.binance.com:9443/stream?streams=btcusdt@trade/ethusdt@trade/xrpusdt@trade/bnbusdt@trade/solusdt@trade';

const LineChartPage = () => {
  const [prices, setPrices] = useState<PricesByAsset>({
    ['BTC/USDT']: [],
    ['ETH/USDT']: [],
    ['XRP/USDT']: [],
    ['BNB/USDT']: [],
    ['SOL/USDT']: [],
  });

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
      <FullscreenBox fullScreenScale={1.2}>
        <Card title="Real Time Crypto Currency Rates">
          <div>
            <MultiLineChart data={prices} width={width} />
          </div>
        </Card>
      </FullscreenBox>
    </div>
  );
};

export default LineChartPage;
