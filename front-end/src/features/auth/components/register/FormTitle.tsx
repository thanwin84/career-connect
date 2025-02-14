type Props = {
  className?: string;
  title: string;
};

export default function FormTitle({ className, title }: Props) {
  return (
    <h2
      className={`dark:text-slate-200 text-slate-700 text-xl mb-6 font-semibold ${className}`}
    >
      {title}
    </h2>
  );
}
