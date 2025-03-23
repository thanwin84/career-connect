import { useFormContext } from 'react-hook-form';
import { Input } from '../ui';
import { InputHTMLAttributes } from 'react';

type Props = {
  className?: string;
  name: string;
  placeholder?: string;
  label?: string;
  type?: string;
  serverErrorMessage?: string;
} & InputHTMLAttributes<HTMLInputElement>;

export default function FormInput({
  className,
  name,
  placeholder,
  serverErrorMessage,
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
      className={`focus:ring-2 ring-slate-300 ${className}`}
      label={label}
      placeholder={placeholder}
      {...register(name as string)}
      errorMessage={
        (serverErrorMessage as string) || (errors[name]?.message as string)
      }
      {...props}
    />
  );
}
