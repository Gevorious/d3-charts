export type CryptoType =
  | 'BTC/USDT'
  | 'ETH/USDT'
  | 'BNB/USDT'
  | 'SOL/USDT'
  | 'XRP/USDT';

export type SocketData = {
  [key in CryptoType]: number;
};

export type PricesByAsset = {
  [key in CryptoType]: { time: number; price: number }[];
};
