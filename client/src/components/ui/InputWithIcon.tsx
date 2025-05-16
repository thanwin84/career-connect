import { InputHTMLAttributes, ReactNode } from 'react';
import Input from './Input';

type Props = {
  icon: ReactNode;
  type?: string;
  name: string;
  className?: string;
  placeholder?: string;
} & InputHTMLAttributes<HTMLInputElement>;

export default function InputWithIcon({
  icon,
  type = 'text',
  name,
  className,
  placeholder,
  ...props
}: Props) {
  return (
    <div
      className={`relative w-full flex py-1 rounded-md bg-white dark:bg-zinc-800 pl-2 focus-within:border-blue-400  ${className}`}
    >
      <span
        aria-hidden={true}
        className="text-xl text-gray-400 dark:text-slate-100 my-auto"
      >
        {icon}
      </span>
      <Input
        type={type}
        name={name}
        placeholder={placeholder}
        {...props}
        className="border-none focus:border-none focus:ring-0 bg-white dark:bg-zinc-800 "
      />
    </div>
  );
}
