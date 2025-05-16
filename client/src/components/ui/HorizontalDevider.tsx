type Props = {
  className?: string;
};

export default function HorizontalDevider({ className }: Props) {
  return (
    <div
      className={`border-b border-gray-200 dark:border-gray-500 ${className}`}
    />
  );
}
