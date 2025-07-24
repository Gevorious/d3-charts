import './styles.scss';
import AddCountryForm from '../../../../AddCountryForm';
import type { CountryFilterProps } from './types';

const CountryFilter = ({
  countries,
  selected,
  onChange,
  addNewRow,
}: CountryFilterProps) => {
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

export default CountryFilter;
