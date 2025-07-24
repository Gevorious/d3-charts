import type { CountryData } from '../../types';

export type CountryFilterProps = {
  countries: CountryData[];
  selected: string[];
  onChange: (selected: string[]) => void;
  addNewRow: (data: CountryData) => void;
};
