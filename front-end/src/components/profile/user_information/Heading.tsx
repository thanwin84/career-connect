import { ReactNode } from "react";

type Props = {
  className?: string;
  icon: ReactNode,
  content: string
};

export default function ({
    className,
    icon,
    content
}: Props) {
  return (
    <div className={` ${className}`}>
        <h2 className="flex items-center gap-4 text-2xl font-bold  dark:text-slate-200 text-slate-800">
            <span aria-hidden="true">{icon}</span>
            <span>{content}</span>
        </h2>
    </div>
  );
}