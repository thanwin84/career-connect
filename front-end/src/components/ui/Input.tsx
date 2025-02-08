import { InputHTMLAttributes, useId } from 'react';
import FormError from './FormError';
import Label from './Label';

type Props = {
  label?: string;
  placeholder?: string;
  errorMessage?: string;
  className?: string;
} & InputHTMLAttributes<HTMLInputElement>;

const Input = function ({
  label,
  placeholder,
  errorMessage,
  className = '',
  ...props
}: Props) {
  const id = useId();
  const style =
    'px-4 py-2 bg-slate-50   w-full text-back dark:text-slate-200 focus:outline-none  border border-gray-200 dark:border-gray-400 bg-transparent  rounded-md focus:ring-1 focus:ring-slate-200  dark:focus:ring-gray-300  ';

  return (
    <div className={`w-full`}>
      {label && <Label id={id} value={label} isError={Boolean(errorMessage)} />}
      <input
        id={id}
        placeholder={placeholder}
        className={` ${style}  ${className}`}
        aria-label={label}
        aria-describedby={errorMessage ? `${id}Error` : undefined}
        {...props}
      />
      {errorMessage && (
        <FormError className="mt-1 " id={`${id}Error`} message={errorMessage} />
      )}
    </div>
  );
};
export default Input;
