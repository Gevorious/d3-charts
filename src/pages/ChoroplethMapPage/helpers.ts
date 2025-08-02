import { format } from 'd3';

export const customFormat = (num: number): string =>
  format('.2s')(num).replace('G', 'B');
