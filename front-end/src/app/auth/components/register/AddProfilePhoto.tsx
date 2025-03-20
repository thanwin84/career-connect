import { Button } from '../../../../components/ui';
import { useFilePreview } from '../../../../hooks';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { IoPersonOutline } from 'react-icons/io5';
import { CiCamera } from 'react-icons/ci';

import { useCreateUser } from '../../hooks/useCreateUser';
import FormTitle from './FormTitle';
import {
  RegisterFormType,
  AddProfileType,
  addProfilePhotoSchema,
} from '../../../../lib/schemas/registerSchema';

type Props = {
  className?: string;
  goBack: () => void;
  user: Partial<RegisterFormType>;
};

export default function AddProfilePhoto({ className, goBack, user }: Props) {
  const { file, fileUrl, handleFileChange } = useFilePreview();
  const { createUser, isPending } = useCreateUser();
  const methods = useForm<AddProfileType>({
    resolver: zodResolver(addProfilePhotoSchema),
  });

  const {
    formState: {
      errors: { avatar },
    },
  } = methods;

  async function handleFinish() {
    const formData = new FormData();
    Object.keys(user).forEach((key) => {
      formData.append(key, user[key as keyof RegisterFormType] as string);
    });
    if (file) {
      formData.append('avatar', file);
    }
    if (avatar && avatar.message) {
      return;
    }

    await createUser(formData);
  }
  function handleBack() {
    goBack();
  }
  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(handleFinish)}
        className={` ${className}`}
      >
        <FormTitle title=" Add Your Profile Photo or Skip it to upload later." />
        <div className="h-24 w-24 rounded-full relative mx-auto">
          <div className=" flex h-full w-full rounded-full  bg-gray-200 justify-center mb-4">
            {fileUrl ? (
              <img
                className="w-full h-full object-cover rounded-full"
                src={fileUrl}
              />
            ) : (
              <IoPersonOutline size={24} className="my-auto text-gray-800" />
            )}
          </div>
          <label
            className=" dark:text-slate-200  px-6 py-2 rounded-md  self-center"
            htmlFor="profile"
          >
            <input
              id="profile"
              className="hidden"
              type="file"
              name="avatar"
              onChange={handleFileChange}
            />
            <div className="bg-gray-100  p-1 rounded-md absolute bottom-2 right-0">
              <CiCamera
                className="text-slate-700 dark:text-slate-900"
                size={22}
              />
            </div>
          </label>
        </div>
        <div className="flex gap-4 justify-between mt-4">
          <Button classname="w-full" category="normal" onClick={handleBack}>
            Back
          </Button>
          <Button classname="w-full" type="submit" disabled={isPending}>
            {isPending ? 'In progess...' : 'Finish'}
          </Button>
        </div>
      </form>
    </FormProvider>
  );
}
