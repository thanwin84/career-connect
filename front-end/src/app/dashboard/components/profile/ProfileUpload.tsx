import { useForm } from 'react-hook-form';
import { IoMdPhotos as PhotoIcon } from 'react-icons/io';
import { useEffect } from 'react';
import { ProgressBar, Input, Button } from '../../../../components/ui';
import { useFilePreview } from '../../../../hooks';
import useFileUpload from '../../../../hooks/useFileUpload';
import { useProfileStore } from '../../../../lib/store/ProfileStore';
import { useUserStore } from '../../../../lib/store/userStore';
import { FormData as FormT } from '../../../../lib/types/common';
type Props = {
  className?: string;
};

export default function ProfileUpload({ className }: Props) {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();
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

  async function action(formdata: FormT) {
    const data = new FormData();
    const file = formdata.avatar[0];
    if (file) {
      data.append('avatar', file);
    }
    uploadPhoto(data);
  }
  return (
    <div className={`dark:bg-zinc-800 bg-white p-8 rounded-md ${className}`}>
      <h2 className="text-center text-2xl  text-slate-800 dark:text-slate-200 font-semibold mb-4">
        Upload your profile photo
      </h2>
      <div className="w-52 h-52 border-2 border-dashed border-gray-300 rounded-full bg-gray-50 mx-auto mb-4">
        <img
          className="w-full h-full object-cover rounded-full"
          src={fileUrl || ''}
          alt="uploaded photo"
        />
      </div>
      <div className="w-full flex gap-6">
        <span className="my-auto text-gray-400">{<PhotoIcon size={22} />}</span>
        <div className="w-full flex flex-col gap-2">
          <span className="font-semibold dark:text-slate-200 ">File name</span>
          <ProgressBar parcentage={uploadParcentage} />
          <p className="text-slate-700 dark:text-slate-300">
            {uploadParcentage}% done
          </p>
        </div>
      </div>
      <form
        className="flex  gap-8 mt-2"
        method="post"
        encType="multipart/form-data"
        onSubmit={handleSubmit(action)}
      >
        <Input
          type="file"
          {...register('avatar', {
            validate: {
              fileSize: (value: FileList | undefined) => {
                if (value && value[0]) {
                  const file = value[0];
                  if (file.size > 500000) {
                    return 'File size cannot be larger than 0.5MB';
                  }
                  return true;
                }
              },
            },
          })}
          errorMessage={errors?.avatar?.message as string}
          onChange={(e) => handleFileChange(e)}
        />
        <Button
          type="submit"
          loadingText="Uploading.."
          classname="w-full"
          loading={isLoading}
        >
          Upload
        </Button>
      </form>
    </div>
  );
}
