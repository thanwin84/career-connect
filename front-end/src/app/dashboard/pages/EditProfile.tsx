import { FormInput } from '@/components/forms';
import { LoadingPage, Button } from '@/components/ui';
import { useFilePreview } from '@/hooks';
import { useUpdateUser } from '@/hooks/api';
import { userFormSchema } from '@/lib/schemas';
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

export default function EditProfile() {
  const userStore = useUserStore();
  const user = userStore.user;
  const { isPending, updateUser } = useUpdateUser();
  const { fileUrl, handleFileChange } = useFilePreview(user?.avatar?.url);

  if (!user) {
    return <LoadingPage />;
  }

  const methods = useForm<UpdateUserProfile>({
    defaultValues: {
      firstName: user.firstName,
      lastName: user.lastName,
      location: user.location,
      phoneNumber: user.phoneNumber,
      email: user.email,
    },
    resolver: zodResolver(formSchema),
  });

  function handleFormSubmit(data: FormType) {
    const formData = new FormData();
    const file = data.avatar?.[0];
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
  }

  return (
    <section className='p-4  '>
      <div className='bg-white  dark:bg-zinc-800 p-4 rounded-md shadow-md'>
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
            <div className='w-full flex gap-3'>
              <img className='w-40 h-36 rounded-md' src={fileUrl as string} />
              <div className='flex flex-col self-start gap-8'>
                <h3 className='font-semibold text-xl dark:text-slate-200'>
                  Upload your profile Photo
                </h3>
                <FormInput
                  name='avatar'
                  label='Select an image File (Max 0.5MB)'
                  type='file'
                  accept='image/*'
                  onChange={(e) => handleFileChange(e)}
                />
              </div>
            </div>
            <div className='mt-4 w-full grid gap-4 lg:grid-cols-2'>
              <FormInput label='First Name' name='firstName' />
              <FormInput label='Last Name' name='lastName' />
              <FormInput name='email' type='email' label='Email' />
              <FormInput label='City' name='location.city' />
              <FormInput label='Country' name='location.country' />
              <FormInput label='Phone Number' name='phoneNumber' />
            </div>
            <div className='flex justify-end mt-4'>
              <Button
                category='success'
                classname='text-nowrap'
                loadingText={'loading'}
                loading={isPending}
              >
                Update User
              </Button>
            </div>
          </form>
        </FormProvider>
      </div>
    </section>
  );
}
