import { CryptoType } from '../../sockets/types';

export type SocketData = {
  [key in CryptoType]: number;
};

export type PricesByAsset = {
  [key in CryptoType]: { time: number; price: number }[];
};
