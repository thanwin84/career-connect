import { ButtonHTMLAttributes, ReactNode } from 'react';
import Spinner from './Spinner';

type Props = {
  children: ReactNode;
  type?: 'button' | 'reset' | 'submit';
  classname?: string;
  category?:
    | 'primary'
    | 'danger'
    | 'success'
    | 'link'
    | 'normal'
    | 'lightDanger'
    | 'outlined';

  loading?: boolean;
  loadingText?: string;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export default function Button({
  type = 'button',
  classname,
  category = 'primary',
  children,
  loading = false,
  loadingText = 'loading..',
  ...props
}: Props) {
  const styles = {
    primary:
      'bg-blue-700 dark:bg-blue-600 dark:text-slate-100 hover:bg-blue-800 dark:hover:bg-blue-700 text-slate-100',
    danger: 'bg-red-500 hover:bg-red-600 text-white',
    success: 'bg-green-500 hover:bg-green-600 text-white',
    link: 'bg-white text-blue-600 hover:underline',
    normal: 'bg-gray-500 text-gray-100 hover:bg-gray-600',
    lightDanger: 'bg-red-50 text-red-500 hover:bg-red-200',
    outlined:
      'border border-gray-600 dark:text-slate-200 hover:bg-slate-800 hover:text-slate-200 dark:hover:bg-slate-100 dark:hover:text-slate-800 dark:text-white text-slate-800',
  };
  const loadingStyle = 'bg-gray-400  cursor-not-allowed';
  return (
    <button
      {...props}
      disabled={loading}
      className={` ${classname} px-4 py-2 rounded-md ${
        loading ? loadingStyle : styles[category]
      } `}
    >
      {loading ? (
        <div className='flex gap-2 justify-center'>
          <Spinner
            size='w-4 h-4'
            borderThickness='border-2'
            color='border-slate-100'
          />
          {loading && <span className='text-slate-200'>{loadingText}</span>}
        </div>
      ) : (
        children
      )}
    </button>
  );
}
