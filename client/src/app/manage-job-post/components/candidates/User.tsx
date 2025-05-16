import { CiUser } from 'react-icons/ci';

type Props = {
  className?: string;
  name: string;
  imgSrc: string;
};

export default function User({ name, className, imgSrc }: Props) {
  return (
    <div className={`flex gap-3 ${className}`}>
      <span className='my-auto'>
        {imgSrc ? (
          <img src={imgSrc} className='h-10 w-10 rounded-full' />
        ) : (
          <CiUser className='dark:text-slate-200' />
        )}
      </span>
      <span className='text-slate-700 dark:text-slate-200 font-semibold my-auto'>
        {name}
      </span>
    </div>
  );
}
