import type { CountryData } from '../Charts/BarChart/types';

export type AddFormProps = {
  show: boolean;
  onSubmit: (formdata: CountryData) => void;
};
