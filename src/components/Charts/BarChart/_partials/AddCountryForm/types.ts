import type { CountryData } from '../../types';

export type AddFormProps = {
  show: boolean;
  onSubmit: (formdata: CountryData) => void;
};
