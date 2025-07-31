export type ChoroplethConfig = {
  width: number;
  height: number;
  margins?: {
    bottom?: number;
    top?: number;
    left?: number;
    right?: number;
  };
  yearRange: [number, number];
};
