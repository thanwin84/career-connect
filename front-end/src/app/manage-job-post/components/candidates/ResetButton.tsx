import { RiRestartLine } from 'react-icons/ri';

type Props = {
  className?: string;
  reset: () => void;
};

export default function ResetButton({ className, reset }: Props) {
  return (
    <button
      onClick={reset}
      className={`text-xl ml-auto text-slate-600 dark:text-slate-300 hover:text-slate-700 cursor-pointer flex ${className}`}
    >
      <RiRestartLine className="  my-auto mr-2" />
      <span>Reset</span>
    </button>
  );
}
