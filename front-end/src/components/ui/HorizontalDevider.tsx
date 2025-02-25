type Props = {
  className?: string;
};

export default function HorizontalLine({}: Props) {
  return <div className="border-b border-gray-200 dark:border-gray-500" />;
}
