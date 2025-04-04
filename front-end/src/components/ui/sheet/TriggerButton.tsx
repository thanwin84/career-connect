import { useSheetContext } from './Sheet';

type Props = {
  className?: string;
  children: React.ReactNode;
};

export default function TriggerButton({ className, children }: Props) {
  const { toggleOpen } = useSheetContext();

  return (
    <button onClick={toggleOpen} className={`${className}`}>
      {children}
    </button>
  );
}
