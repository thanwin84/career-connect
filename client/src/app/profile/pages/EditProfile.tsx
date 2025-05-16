import { FormInput } from '@/components/forms';
import {
  LoadingPage,
  Button,
  LoadingButton,
  ProfilePhotoUploader,
} from '@/components/ui';
import { useFilePreview } from '@/hooks';
import { useUpdateUser } from '@/hooks/api';
import { userFormSchema } from '@/lib/schemas';
import { useProfileStore } from '@/lib/store/ProfileStore';
import { useUserStore } from '@/lib/store/userStore';
import { UpdateUserProfile } from '@/lib/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, FormProvider } from 'react-hook-form';
import { z } from 'zod';

const formSchema = userFormSchema.pick({
  firstName: true,
  lastName: true,
  email: true,
  location: true,
  avatar: true,
  phoneNumber: true,
});
type FormType = z.infer<typeof formSchema>;

export default function EditProfile({ className }: { className?: string }) {
  const userStore = useUserStore();
  const user = userStore.currentSelectedUser;
  const { toggleEditUserModal } = useProfileStore();
  const { isPending, updateUser } = useUpdateUser();
  const { fileUrl, handleFileChange, file } = useFilePreview(user?.avatar?.url);

  const methods = useForm<UpdateUserProfile>({
    defaultValues: {
      firstName: user?.firstName,
      lastName: user?.lastName,
      location: user?.location,
      phoneNumber: user?.phoneNumber,
      email: user?.email,
    },
    resolver: zodResolver(formSchema),
  });
  if (!user) {
    return <LoadingPage />;
  }

  function handleFormSubmit(data: FormType) {
    const formData = new FormData();

    if (file) {
      formData.append('avatar', file);
    }
    formData.append('firstName', data.firstName);
    formData.append('lastName', data.lastName);
    formData.append('location[city]', data.location?.city as string);
    formData.append('location[country]', data.location?.country as string);
    formData.append('phoneNumber', data?.phoneNumber || '');
    formData.append('email', data.email as string);

    updateUser(formData);

    userStore.updateUser(
      {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        location: {
          city: data.location.city,
          country: data.location.country,
        },
        phoneNumber: data.phoneNumber,
      },
      fileUrl as string
    );
    toggleEditUserModal();
  }

  return (
    <section className={`w-full ${className} `}>
      <div className='bg-white p-8 dark:bg-stone-800  rounded-md shadow-md'>
        <h2
          id='formTitle'
          className='mb-4 text-2xl font-semibold dark:text-slate-200'
        >
          Profile
        </h2>

        <FormProvider {...methods}>
          <form
            onSubmit={methods.handleSubmit(handleFormSubmit)}
            aria-describedby='formTitle'
            method='post'
            encType='multipart/form-data'
          >
            <ProfilePhotoUploader
              imgPreviewUrl={fileUrl || ''}
              onFileChange={handleFileChange}
            />
            <div className='mt-4 w-full grid gap-4 lg:grid-cols-2'>
              <FormInput label='First Name' name='firstName' />
              <FormInput label='Last Name' name='lastName' />
              <FormInput name='email' type='email' label='Email' />
              <FormInput label='City' name='location.city' />
              <FormInput label='Country' name='location.country' />
              <FormInput label='Phone Number' name='phoneNumber' />
            </div>
            <div className='flex justify-end mt-4'>
              {isPending ? (
                <LoadingButton buttonText='Updating changes..' />
              ) : (
                <Button category='success' classname='w-full text-nowrap'>
                  Update User
                </Button>
              )}
            </div>
          </form>
        </FormProvider>
      </div>
    </section>
  );
}
