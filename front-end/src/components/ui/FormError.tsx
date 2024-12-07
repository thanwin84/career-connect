type Props = {
  message: string;
  className?: string;
  id: string;
};

export default function FormError({ message, className, id }: Props) {
  if (message === "") {
    return null;
  }
  return (
    <span
      id={id}
      className={`text-sm text-red-400 dark:text-red-500 ${className}`}
    >
      {message.slice(0, 1).toUpperCase() + message.slice(1)}
    </span>
  );
}
