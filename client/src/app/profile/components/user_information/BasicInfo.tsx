type Props = {
  className?: string;
  label: string;
  text: string;
};

export default function BasicInfo({ className, label, text }: Props) {
  return (
    <div className={`flex flex-col ${className}`}>
      <span className='text-slate-700 font-semibold dark:text-slate-300'>
        {label}
      </span>
      <span className=' text-slate-700 dark:text-slate-200'>{text}</span>
    </div>
  );
}
