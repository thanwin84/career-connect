import { ChangeEvent } from 'react';
import { useFormContext } from 'react-hook-form';
import { CiCamera } from 'react-icons/ci';
import { IoPersonOutline } from 'react-icons/io5';

type Props = {
  className?: string;
  onFileChange: (e: ChangeEvent<HTMLInputElement>) => void;
  imgPreviewUrl?: string;
};

export default function ProfilePhotoUploader({
  onFileChange,
  imgPreviewUrl,
}: Props) {
  const { register } = useFormContext();
  return (
    <div className='h-24 w-24 rounded-full relative mx-auto'>
      <div className=' flex h-full w-full rounded-full  bg-gray-200 justify-center mb-4'>
        {imgPreviewUrl ? (
          <img
            className='w-full h-full object-cover rounded-full'
            src={imgPreviewUrl}
          />
        ) : (
          <IoPersonOutline size={24} className='my-auto text-gray-800' />
        )}
      </div>
      <label
        className=' dark:text-slate-200   rounded-md  self-center'
        htmlFor='profile'
      >
        <input
          id='profile'
          className='hidden'
          type='file'
          {...register('avatar')}
          name='avatar'
          onChange={onFileChange}
          accept='image/*'
        />
        <div className='bg-gray-100  p-1 rounded-md absolute bottom-2 right-0'>
          <CiCamera className='text-slate-700 dark:text-slate-900' size={22} />
        </div>
      </label>
    </div>
  );
}
