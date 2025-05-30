import { CrossButton } from '../ui';

type Props = {
  className?: string;
  title: string;
  closeModal?: () => void;
  id?: string;
};

export default function FormHeader({
  className,
  title,
  closeModal,
  id = '',
}: Props) {
  return (
    <div className={`flex justify-between ${className}`}>
      <h2 id={id} className='text-xl mb-2 font-semibold dark:text-slate-200'>
        {title}
      </h2>
      {closeModal && <CrossButton action={closeModal} />}
    </div>
  );
}
