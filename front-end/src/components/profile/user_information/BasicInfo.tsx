type Props = {
  className?: string;
  label: string;
  text: string;
};

export default function BasicInfo({ className, label, text }: Props) {
  return (
    <div className={`flex flex-col ${className}`}>
      <span className="text-slate-600 dark:text-slate-400">{label}</span>
      <span className="font-medium dark:text-slate-200">{text}</span>
    </div>
  );
}
