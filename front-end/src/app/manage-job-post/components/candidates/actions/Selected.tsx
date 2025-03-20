import { RxCross2 } from 'react-icons/rx';
type Props = {
  className?: string;
  count: number;
  deselectAll: () => void;
};

export default function Selected({ className, count, deselectAll }: Props) {
  return (
    <button
      className={`flex gap-2  hover:text-blue-700 dark:hover:text-blue-500  ${className}`}
      onClick={deselectAll}
    >
      <RxCross2 className="my-auto" />
      <span className="my-auto">{`(${count} Selected)`}</span>
    </button>
  );
}
