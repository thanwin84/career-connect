import React from 'react';
import Select from 'react-select';
import { useFormContext } from 'react-hook-form';
import Label from '../ui/Label';

type Option = {
  label: string;
  value: string;
};

interface FormSelectProps {
  name: string;
  label: string;
  options: Option[];
  placeholder?: string;
}

const FormSelect: React.FC<FormSelectProps> = ({
  name,
  label,
  options,
  placeholder = 'Select...',
}) => {
  const {
    register,
    setValue,
    getValues,
    formState: { errors },
  } = useFormContext();

  const error = errors[name]?.message as string | undefined;
  const selectedValue = getValues(name);

  // Determine if dark mode is active
  const isDarkMode = document.documentElement.classList.contains('dark');

  return (
    <div className='w-full'>
      <Label isError={Boolean(error)} id={name} value={label} />
      <Select
        {...register(name)}
        inputId={name}
        options={options}
        classNamePrefix='react-select'
        value={
          selectedValue
            ? options.find((opt) => opt.value === selectedValue)
            : null
        }
        onChange={(option) =>
          setValue(name, option?.value, { shouldValidate: true })
        }
        placeholder={placeholder}
        styles={{
          control: (base) => ({
            ...base,
            backgroundColor: isDarkMode ? '#292524' : '#ffffff', // Stone for dark, white for light
            borderColor: '#6b7280',
            color: isDarkMode ? '#f1f5f9' : '#1c1917', // Text color adjusted for both modes
          }),
          singleValue: (base) => ({
            ...base,
            color: isDarkMode ? '#f1f5f9' : '#1c1917', // Text color in both modes
          }),
          menu: (base) => ({
            ...base,
            backgroundColor: isDarkMode ? '#292524' : '#ffffff', // Stone for dark, white for light
          }),
          option: (base, { isFocused }) => ({
            ...base,
            backgroundColor: isFocused
              ? isDarkMode
                ? '#3a3a3a'
                : '#f1f5f9'
              : isDarkMode
              ? '#292524'
              : '#ffffff', // Adjust background color for hover
            color: isDarkMode ? '#f1f5f9' : '#1c1917',
          }),
        }}
      />
      {error && <p className='text-red-500 text-sm mt-1'>{error}</p>}
    </div>
  );
};

export default FormSelect;
