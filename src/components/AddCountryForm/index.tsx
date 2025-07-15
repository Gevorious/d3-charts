import type { AddFormProps } from './types';
import './styles.scss';

const AddCountryForm = ({ show, onSubmit }: AddFormProps) => {
  const onFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const country = formData.get('country') as string;
    const population = parseInt(formData.get('population') as string);
    onSubmit({ country, population });
    e.currentTarget.reset();
  };

  return show ? (
    <form
      className="add-country-form"
      onSubmit={onFormSubmit}
      onInvalid={(e) => {
        e.preventDefault();
        const input = e.target as HTMLInputElement;
        input.classList.add('error');
      }}
    >
      <input type="text" name="country" placeholder="Country" required />
      <input
        type="number"
        name="population"
        placeholder="Population"
        min="1"
        step="1"
        required
      />
      <button type="submit">Add Country</button>
    </form>
  ) : null;
};

export default AddCountryForm;
