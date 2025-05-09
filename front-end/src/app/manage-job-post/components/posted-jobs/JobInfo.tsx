import { ReactNode } from 'react';

type Props = {
  icon: ReactNode;
  text: string;
};
export default function JobInfo({ icon, text }: Props) {
  return (
    <div className="flex gap-2">
      <span className="my-auto" aria-hidden="true">
        {icon}
      </span>
      <span className="dark:text-slate-300">{text}</span>
    </div>
  );
}
