import { CrossIcon } from '../../assets/icons/Icons';

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
      {closeModal && (
        <button
          onClick={closeModal}
          className='text-xl dark:text-slate-100 font-bold hover:text-red-600 dark:hover:text-red-600 hover:text-2xl'
        >
          <CrossIcon />
        </button>
      )}
    </div>
  );
}
