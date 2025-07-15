import type { CountryData } from '../Chart/types';

export type CountryFilterProps = {
  countries: CountryData[];
  selected: string[];
  onChange: (selected: string[]) => void;
  addNewRow: (data: CountryData) => void;
};
