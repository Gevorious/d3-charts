export type CryptoType =
  | 'bitcoin'
  | 'ethereum'
  | 'monero'
  | 'dogecoin'
  | 'litecoin';

export type SocketData = {
  [key in CryptoType]: number;
};

export type PricesByAsset = {
  [key in CryptoType]: { time: number; price: number }[];
};
