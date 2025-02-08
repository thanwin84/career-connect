import { forwardRef, SelectHTMLAttributes, useId } from 'react';
import FormError from './FormError';
import Label from './Label';

type Props = {
  label?: string;
  options: string[];
  className?: string;
  errorMessage?: string;
  placeholder?: string;
} & SelectHTMLAttributes<HTMLSelectElement>;

const style =
  'px-4 py-2 bg-transparent w-full text-back dark:text-slate-200 focus:outline-none border dark:border-gray-400 focus:border-none rounded-md';
const errorStyle =
  'border-red-400 focus:ring-2 focus:ring-red-300 dark:focus:ring-red-500';
// const success = "border border-green-400 focus:ring-2 focus:ring-green-300";

const Select = forwardRef<HTMLSelectElement, Props>(
  (
    {
      placeholder,
      label,
      options = [],
      className,
      errorMessage,
      ...props
    }: Props,
    ref
  ) => {
    const id = useId();

    return (
      <div className={`${className}`}>
        {label && (
          <Label value={label} id={id} isError={Boolean(errorMessage)} />
        )}

        <select
          id={id}
          {...props}
          ref={ref}
          className={`${style}  ${errorMessage ? errorStyle : ''}`}
        >
          {/* First option as a placeholder, disabled */}
          <option value="" disabled>
            {placeholder}
          </option>

          {/* Map over other options */}
          {options.map((value) => (
            <option key={value} value={value}>
              {value}
            </option>
          ))}
        </select>

        {errorMessage && <FormError message={errorMessage} id={id} />}
      </div>
    );
  }
);

export default Select;
