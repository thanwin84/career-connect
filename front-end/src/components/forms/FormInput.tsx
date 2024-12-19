import { useFormContext } from 'react-hook-form';
import { Input } from '../ui';
import { InputHTMLAttributes } from 'react';

type Props = {
  className?: string;
  name: string;
  placeholder?: string;
  label?: string;
  type?: string;
} & InputHTMLAttributes<HTMLInputElement>;

export default function FormInput({
  className,
  name,
  placeholder,
  label,
  type = 'text',
  ...props
}: Props) {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <Input
      type={type}
      className={className}
      label={label}
      placeholder={placeholder}
      {...register(name as string)}
      errorMessage={errors[name]?.message as string}
      {...props}
    />
  );
}
