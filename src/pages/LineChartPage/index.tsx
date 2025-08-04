import { useEffect, useState } from 'react';
import { webSocketHandler } from './websocket';
import { CryptoType, PricesByAsset, SocketData } from './types';
import { MultiLineChart } from '../../components/Charts';
import Card from '../../components/Card';
import './styles.scss';

const CRYPTO_URL = `wss://wss.coincap.io/prices?assets=bitcoin,ethereum,monero,litecoin,dogecoin&apiKey=${
  import.meta.env.VITE_API_KEY
}`;

const LineChartPage = () => {
  const [prices, setPrices] = useState<PricesByAsset>({
    litecoin: [],
    dogecoin: [],
    bitcoin: [],
    ethereum: [],
    monero: [],
  });

  useEffect(() => {
    const socket = webSocketHandler(CRYPTO_URL, (data: SocketData) => {
      setPrices((prev) => {
        const next = { ...prev };

        for (const key in data) {
          const asset = key as CryptoType;
          const newEntry = { time: Date.now(), price: data[asset] };
          const updatedArray = [...next[asset], newEntry];

          next[asset] =
            updatedArray.length > 500
              ? updatedArray.slice(updatedArray.length - 500)
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
      <Card title="Real Time Crypto Currency Prices">
        <MultiLineChart data={prices} width={1100} />
      </Card>
    </div>
  );
};

export default LineChartPage;
