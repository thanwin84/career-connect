import { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import FormError from './FormError';

type Props = {
  options: string[];
  className?: string;
  name: string;
  title: string;
};
export default function SelectSingleOptionBox({
  options,
  className,
  name,
  title,
}: Props) {
  const { register, formState } = useFormContext();
  const [selectedOption, setSelectedOption] = useState<string>(
    formState.defaultValues?.experianceLevel
  );

  return (
    <>
      <div className={`${className}`}>
        <p className="text-slate-800 font-semibold mb-2 dark:text-slate-300">
          {title}
        </p>
        <ul className={`w-full flex gap-2`}>
          {options.map((option) => (
            <label
              key={option}
              onClick={() => setSelectedOption(option)}
              className={`px-6 py-2 border rounded-md text-nowrap cursor-pointer  dark:text-slate-200  ${
                selectedOption === option
                  ? 'bg-zinc-800  dark:bg-zinc-100 text-white dark:text-slate-900'
                  : 'dark:border-gray-400'
              }`}
            >
              <input
                value={option}
                type="radio"
                className="hidden"
                {...register(name)}
              />
              {option.substring(0, 1).toUpperCase() + option.substring(1)}
            </label>
          ))}
        </ul>
        {formState.errors[name] && (
          <FormError
            message={formState.errors[name]?.message as string}
            id={name}
          />
        )}
      </div>
    </>
  );
}
