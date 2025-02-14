import { Form } from 'react-router-dom';
import { FormEvent } from 'react';
import { SearchIcon, LocationIcon } from '../../../assets/icons/Icons';
import { Button, InputWithIcon } from '../../../components/ui';

type Props = {
  className?: string;
  defaultSearch?: string;
  defaultLocation?: string;
  action?: (e: FormEvent<HTMLFormElement>) => void;
};

export default function SearchBar({
  className,
  defaultSearch,
  defaultLocation,
  action,
}: Props) {
  return (
    <Form
      className={`lg:flex   px-4 py-6 rounded-md ${className}`}
      onSubmit={action}
    >
      <div className="w-full flex flex-col lg:flex-row gap-4 px-4 py-6">
        <InputWithIcon
          name="search"
          icon={<SearchIcon />}
          placeholder="Enter job title, company name"
          type="search"
          defaultValue={defaultSearch}
        />
        <InputWithIcon
          name="location"
          icon={<LocationIcon />}
          placeholder="Enter country or city name"
          type="search"
          defaultValue={defaultLocation}
        />
      </div>
      <div className="my-auto flex justify-end">
        <Button type="submit" classname="mb-4 w-full  lg:mb-0 bg-blue-600">
          Search
        </Button>
      </div>
    </Form>
  );
}
