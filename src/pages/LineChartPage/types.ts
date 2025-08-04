export type CryptoType =
  | 'BTC/USDT'
  | 'ETH/USDT'
  | 'AVAX/USDT'
  | 'BNB/USDT'
  | 'SOL/USDT';

export type SocketData = {
  [key in CryptoType]: number;
};

export type PricesByAsset = {
  [key in CryptoType]: { time: number; price: number }[];
};
