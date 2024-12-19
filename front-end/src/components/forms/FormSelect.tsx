import { useFormContext } from 'react-hook-form';
import { Select } from '../ui';

type Props = {
  className?: string;
  label?: string;
  name: string;
  options: string[];
  placeholder: string;
};

export default function FormSelect({
  placeholder,
  className,
  label,
  name,
  options,
}: Props) {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  return (
    <Select
      placeholder={placeholder}
      className={className}
      options={options}
      {...register(name)}
      label={label}
      errorMessage={errors[name]?.message as string}
    />
  );
}
