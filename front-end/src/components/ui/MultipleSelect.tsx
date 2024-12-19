import { useEffect, useState } from "react";
import { AngleDownIcon, AngleUpIcon } from "../../assets/icons/Icons";

type Props = {
  className?: string;
  title: string;
  options: string[];
  selectedOptions: string[];
  onSelect: (selectedItem: string) => void;
};

export default function MultipleSelect({
  className,
  title,
  options,
  selectedOptions,
  onSelect,
}: Props) {
  const [open, setOpen] = useState(() => {
    const savedOpenState = sessionStorage.getItem(`${title}-open`);
    return savedOpenState ? JSON.parse(savedOpenState) : false;
  });

  useEffect(() => {
    sessionStorage.setItem(`${title}-open`, JSON.stringify(open));
  }, [open]);

  return (
    <div
      className={`w-full  py-2 border-b border-gray-300 dark:border-gray-500  ${className}`}
    >
      <div className="w-full flex justify-between px-4 py-2">
        <span className="text-lg font-semibold text-gray-800 dark:text-slate-200">
          {title}
        </span>
        <button
          type="button"
          className="text-gray-600 dark:text-gray-200 text-xl focus:outline-none"
          onClick={() => setOpen(!open)}
        >
          {open ? <AngleUpIcon /> : <AngleDownIcon />}
        </button>
      </div>
      {open && (
        <ul
          role="list"
          aria-label={`${title} options`}
          className="px-6 text-gray-700 dark:text-slate-300 "
        >
          {options?.map((option) => (
            <li key={option} className="flex gap-4 cursor-pointer mb-1">
              <input
                id={option}
                type="checkbox"
                checked={selectedOptions.includes(option)}
                aria-checked={selectedOptions.includes(option)}
                className="accent-green-500 cursor-pointer"
                onChange={() => onSelect(option)}
                role="checkbox"
              />
              <label htmlFor={option} className="cursor-pointer">
                {option.substring(0, 1).toUpperCase() + option.substring(1)}
              </label>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
