import { useSearchParams } from 'react-router-dom';
import Select from 'react-select';

type Props = {
  className?: string;
  options: { value: string; label: string }[];
};
const selectStyles = {
  control: (provided: any) => ({
    ...provided,
    cursor: 'pointer',
  }),
  option: (provided: any) => ({
    ...provided,
    cursor: 'pointer',
  }),
};

export default function Sort({ options }: Props) {
  const [searchParams, setSearchParams] = useSearchParams();
  function handleSearchParams(value: string) {
    searchParams.set('sort', value);
    setSearchParams(searchParams);
  }

  return (
    <Select
      isSearchable={false}
      className=' text-sm text-slate-800'
      defaultValue={options[0]}
      options={options}
      onChange={(option) => handleSearchParams(option?.value as string)}
      styles={selectStyles}
    />
  );
}
