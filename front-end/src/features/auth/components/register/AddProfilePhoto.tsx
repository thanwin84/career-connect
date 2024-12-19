import { Button } from '../../../../components/ui';
import { useFilePreview } from '../../../../hooks';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  addProfilePhotoSchema,
  AddProfileType,
  RegisterFormType,
} from '../../validations';
import { useCreateUser } from '../../hooks/useCreateUser';
import FormTitle from './FormTitle';

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
        className={`h-screen ${className}`}
      >
        <FormTitle title=" Add Your Profile Photo or Skip it to upload later." />
        <div className="flex justify-center mb-4">
          <div className="border-2 border-dashed w-40 h-40 rounded-full">
            {fileUrl && (
              <img
                className="w-full h-full object-cover rounded-full"
                src={fileUrl}
              />
            )}
          </div>
        </div>
        <label
          className="dark:text-slate-200 bg-blue-500 px-6 py-2 rounded-md  self-center"
          htmlFor="profile"
        >
          <span>Upload Photo</span>
          <input
            id="profile"
            className="hidden"
            type="file"
            name="avatar"
            onChange={handleFileChange}
          />
        </label>
        <div className="flex gap-4 justify-between mt-4">
          <Button classname="w-full" category="normal" onClick={handleBack}>
            Back
          </Button>
          <Button
            classname="w-full"
            category="success"
            type="submit"
            disabled={isPending}
          >
            {isPending ? 'In progess...' : 'Finish'}
          </Button>
        </div>
      </form>
    </FormProvider>
  );
}
