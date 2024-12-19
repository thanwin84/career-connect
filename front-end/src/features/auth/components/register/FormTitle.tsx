type Props = {
  className?: string;
  title: string;
};

export default function FormTitle({ className, title }: Props) {
  return (
    <h2 className={`dark:text-slate-200 text-xl mb-6 ${className}`}>{title}</h2>
  );
}
