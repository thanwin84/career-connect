import { ComboBox } from '@/components/ui';
import { ComboBoxListItem } from '@/components/ui/combobox';
import { CountryList, City } from '@/lib/types';
import { useState, useEffect } from 'react';
import { useFormContext } from 'react-hook-form';

type Props = {
  className?: string;
  countryList: CountryList;
  country: string;
  jobLocation: string;
};
function filterList(list: CountryList, searchTerm: string) {
  const filteredList = list?.filter((item) =>
    item.name.toLowerCase().startsWith(searchTerm.toLowerCase())
  );
  return filteredList;
}

function filterCityList(list: City[], searchTerm: string) {
  const filteredList = list?.filter((item) =>
    item.name.toLowerCase().startsWith(searchTerm.toLowerCase())
  );
  return filteredList;
}

export default function Location({
  countryList,
  className,
  country,
  jobLocation,
}: Props) {
  const [filteredCountry, setFilterCountry] = useState(countryList);
  const [cities, setCities] = useState<City[]>([]);
  const [fileteredCities, setFilterCities] = useState<City[]>([]);
  const { register, setValue, formState, trigger } = useFormContext();

  function handleCountryOnChange(value: string) {
    setValue('country', '');
    trigger('country');
    setFilterCountry(filterList(countryList, value));
  }
  function handleCityChange(value: string) {
    setValue('jobLocation', '');
    trigger('jobLocation');
    setFilterCities(filterCityList(cities, value));
  }

  function handleCountrySelect(value: string) {
    const country = countryList.find(
      (item) => item.name.toLowerCase() === value.toLowerCase()
    );
    const cities = country?.cities;
    if (cities) {
      setCities(cities);
      setFilterCities(cities);
    }
    setValue('country', value);
    trigger('country');
  }

  function handleCitySelect(value: string) {
    setValue('jobLocation', value);
    trigger('jobLocation');
  }

  useEffect(() => {
    register('country', { required: 'Please select a country' });
    register('jobLocation', { required: 'Please select a city' });
    if (country && jobLocation) {
      setValue('country', country);
      setValue('jobLocation', jobLocation);
    }
  }, []);

  return (
    <div className={`flex gap-4 ${className}`}>
      <ComboBox
        label='Country'
        name='country'
        defaultValue={country}
        onChange={handleCountryOnChange}
        onSelect={handleCountrySelect}
        errorMessage={formState.errors.country?.message as string}
      >
        {filteredCountry?.map((country) => (
          <ComboBoxListItem
            key={country._id}
            value={country.name}
            className='px-2 py-2 hover:bg-gray-100 rounded-md'
          >
            {country.name}
          </ComboBoxListItem>
        ))}
      </ComboBox>
      <ComboBox
        label='City'
        name='city'
        defaultValue={jobLocation}
        onChange={handleCityChange}
        onSelect={handleCitySelect}
        errorMessage={formState.errors.city?.message as string}
      >
        {fileteredCities?.map((country) => (
          <ComboBoxListItem
            key={country._id}
            value={country.name}
            className='px-2 py-2 hover:bg-gray-100 rounded-md'
          >
            {country.name}
          </ComboBoxListItem>
        ))}
      </ComboBox>
    </div>
  );
}
