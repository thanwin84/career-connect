import { Button, ProfilePhotoUploader } from '@/components/ui';
import { useFilePreview } from '@/hooks';
import useFileUpload from '@/hooks/useFileUpload';
import { userFormSchema } from '@/lib/schemas';
import { useProfileStore } from '@/lib/store/ProfileStore';
import { useUserStore } from '@/lib/store/userStore';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { z } from 'zod';

type Props = {
  className?: string;
};

const formSchema = userFormSchema.pick({ avatar: true });
type ProfileUploadType = z.infer<typeof formSchema>;

export default function ProfileUpload({ className }: Props) {
  const methods = useForm<ProfileUploadType>({
    resolver: zodResolver(formSchema),
  });

  const userStore = useUserStore();
  const profileStore = useProfileStore();
  const { fileUrl, handleFileChange, file } = useFilePreview(
    userStore.currentSelectedUser?.avatar?.url || ''
  );
  const { uploadPhoto, isLoading, isSuccess } = useFileUpload();

  useEffect(() => {
    if (isSuccess) {
      profileStore.toggleProfileUploadModal();
      userStore.updateUserAvatar(fileUrl as string);
    }
  }, [isSuccess, fileUrl, userStore, profileStore]);

  async function action() {
    const data = new FormData();
    if (file) {
      data.append('avatar', file);
    }
    uploadPhoto(data);
  }
  return (
    <div
      className={`w-full dark:bg-stone-900 bg-white p-8 rounded-md ${className}`}
    >
      <h2 className='text-center text-xl  text-stone-900 dark:text-slate-200 font-semibold mb-4'>
        Upload your profile photo
      </h2>

      <FormProvider {...methods}>
        <form
          className='w-full flex flex-col gap-4 mt-2'
          onSubmit={methods.handleSubmit(action)}
        >
          <ProfilePhotoUploader
            imgPreviewUrl={fileUrl as string}
            onFileChange={handleFileChange}
          />
          <Button
            type='submit'
            classname='w-full text-sm mt-4'
            loading={isLoading}
          >
            Upload
          </Button>
        </form>
      </FormProvider>
    </div>
  );
}
