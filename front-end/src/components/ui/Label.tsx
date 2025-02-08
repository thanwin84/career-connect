type Props = {
  className?: string;
  id?: string;
  isError: boolean;
  value: string;
};

export default function Label({ id, isError, value }: Props) {
  return (
    <label
      htmlFor={id}
      className={`block mb-2 font-semibold ${
        isError
          ? ' dark:text-red-400 text-red-500'
          : 'text-slate-800 dark:text-slate-200'
      }`}
    >
      {value}
    </label>
  );
}
