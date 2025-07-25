export type YearSliderProps = {
  width: number;
  height: number;
  yearRange: [number, number];
  onChange: (year: number) => void;
  year: number;
};
