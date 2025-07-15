import type { CountryData } from '../Chart/types';

export type AddFormProps = {
  show: boolean;
  onSubmit: (formdata: CountryData) => void;
};
