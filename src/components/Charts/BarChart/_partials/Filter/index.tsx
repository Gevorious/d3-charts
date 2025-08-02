import './styles.scss';
import AddCountryForm from '../AddCountryForm';
import type { FilterProps } from './types';

const Filter = ({ countries, selected, onChange, addNewRow }: FilterProps) => {
  const toggle = (country: string) => {
    if (selected.includes(country)) {
      onChange(selected.filter((c) => c !== country));
    } else {
      onChange([...selected, country]);
    }
  };

  return (
    <>
      <ul className="country-list">
        {countries.map(({ country, population }) => (
          <li key={country}>
            <label>
              <input
                type="checkbox"
                checked={selected.includes(country)}
                onChange={() => toggle(country)}
              />
              <span>{country}</span>
            </label>
            <span>{population.toLocaleString()}</span>
          </li>
        ))}
      </ul>
      <AddCountryForm show onSubmit={addNewRow} />
    </>
  );
};

export default Filter;
