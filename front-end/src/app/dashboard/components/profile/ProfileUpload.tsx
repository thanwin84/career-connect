import { FormInput } from '@/components/forms';
import { ProgressBar, Button } from '@/components/ui';
import { useFilePreview } from '@/hooks';
import useFileUpload from '@/hooks/useFileUpload';
import { userFormSchema } from '@/lib/schemas';
import { useProfileStore } from '@/lib/store/ProfileStore';
import { useUserStore } from '@/lib/store/userStore';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { IoMdPhotos as PhotoIcon } from 'react-icons/io';

type Props = {
  className?: string;
};

const formSchema = userFormSchema.pick({ avatar: true });
type ProfileUploadType = z.infer<typeof formSchema>;

export default function ProfileUpload({ className }: Props) {
  const { handleSubmit } = useForm<ProfileUploadType>({
    resolver: zodResolver(userFormSchema),
  });

  const userStore = useUserStore();
  const profileStore = useProfileStore();
  const { fileUrl, handleFileChange } = useFilePreview(
    userStore.user?.avatar?.url || ''
  );
  const { uploadPhoto, uploadParcentage, isLoading, isSuccess, data } =
    useFileUpload();

  useEffect(() => {
    if (isSuccess) {
      profileStore.toggleProfileUploadModal();
      userStore.updateUserAvatar(data?.avatar?.url as string);
    }
  }, [isSuccess]);

  async function action(formdata: ProfileUploadType) {
    const data = new FormData();
    const file = formdata?.avatar?.[0];
    if (file) {
      data.append('avatar', file);
    }
    uploadPhoto(data);
  }
  return (
    <div className={`dark:bg-zinc-800 bg-white p-8 rounded-md ${className}`}>
      <h2 className='text-center text-2xl  text-slate-800 dark:text-slate-200 font-semibold mb-4'>
        Upload your profile photo
      </h2>
      <div className='w-52 h-52 border-2 border-dashed border-gray-300 rounded-full bg-gray-50 mx-auto mb-4'>
        <img
          className='w-full h-full object-cover rounded-full'
          src={fileUrl || ''}
          alt='uploaded photo'
        />
      </div>
      <div className='w-full flex gap-6'>
        <span className='my-auto text-gray-400'>{<PhotoIcon size={22} />}</span>
        <div className='w-full flex flex-col gap-2'>
          <span className='font-semibold dark:text-slate-200 '>File name</span>
          <ProgressBar parcentage={uploadParcentage} />
          <p className='text-slate-700 dark:text-slate-300'>
            {uploadParcentage}% done
          </p>
        </div>
      </div>
      <form
        className='flex  gap-8 mt-2'
        method='post'
        encType='multipart/form-data'
        onSubmit={handleSubmit(action)}
      >
        <FormInput
          name='avatar'
          className='hidden'
          onChange={handleFileChange}
        />
        <Button
          type='submit'
          loadingText='Uploading..'
          classname='w-full'
          loading={isLoading}
        >
          Upload
        </Button>
      </form>
    </div>
  );
}
