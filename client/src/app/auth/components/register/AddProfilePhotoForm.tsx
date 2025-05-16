import { useFilePreview } from '@/hooks';
import { userFormSchema, UserFormType } from '@/lib/schemas';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, LoadingButton, ProfilePhotoUploader } from '@/components/ui';
import TransitionPage from '@/components/ui/TransitionPage';
import FormTitle from './FormTitle';
import { useRegisterContext } from '@/contexts';

type Props = {
  className?: string;
  goBack: () => void;
};

export default function AddProfilePhotoForm({ className, goBack }: Props) {
  const { submitRegistration, isFormPending } = useRegisterContext();
  const { file, fileUrl, handleFileChange } = useFilePreview();
  const methods = useForm<Pick<UserFormType, 'avatar'>>({
    resolver: zodResolver(userFormSchema.pick({ avatar: true })),
  });

  const {
    formState: {
      errors: { avatar },
    },
  } = methods;

  async function handleFinish() {
    if (avatar && avatar.message) {
      return;
    }
    submitRegistration(file);
  }
  function handleBack() {
    goBack();
  }
  return (
    <FormProvider {...methods}>
      <TransitionPage>
        <form
          onSubmit={methods.handleSubmit(handleFinish)}
          className={` ${className}`}
        >
          <FormTitle title=' Add Your Profile Photo or Skip it to upload later.' />
          <ProfilePhotoUploader
            imgPreviewUrl={fileUrl || ''}
            onFileChange={handleFileChange}
          />
          <div className='flex gap-4 justify-between mt-4'>
            <Button classname='w-full' category='normal' onClick={handleBack}>
              Back
            </Button>
            {isFormPending ? (
              <LoadingButton buttonText='In progress..' />
            ) : (
              <Button classname='w-full' type='submit'>
                Complete
              </Button>
            )}
          </div>
        </form>
      </TransitionPage>
    </FormProvider>
  );
}
