import { RxCross2 as CrossIcon } from "react-icons/rx";
type Props = {
  className?: string;
  action: () => void;
};

export default function CrossButton({ className, action }: Props) {
  return (
    <button onClick={action}>
      <CrossIcon
        className={`text-xl dark:text-slate-200 hover:text-2xl hover:font-bold transition duration-300 ease-linear ${className}`}
      />
    </button>
  );
}
