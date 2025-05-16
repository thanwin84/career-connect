type Props = {
  className?: string;
};

export default function EmptyJobPage({}: Props) {
  return (
    <div>
      <h2 className="text-2xl text-slate-700 dark:text-slate-300 text-center">
        No Jobs to display.....
      </h2>
    </div>
  );
}
