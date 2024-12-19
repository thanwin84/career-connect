import { Button, LoadingPage } from '../../../components/ui';
import { useForm, FormProvider } from 'react-hook-form';
import { useFilePreview } from '../../../hooks';
import { FormData as FData } from '../../../types';
import { zodResolver } from '@hookform/resolvers/zod';
import { useUpdateUser } from '../hooks/useUpdateUser';
import { editUserProfileSchema } from '../validations';
import FormInput from '../../../components/forms/FormInput';
import { useUserStore } from '../../../store/userStore';

export default function EditProfile() {
  const userStore = useUserStore();
  const user = userStore.user;
  const { isPending, updateUser } = useUpdateUser();
  const { fileUrl, handleFileChange } = useFilePreview(user?.avatar?.url);

  if (!user) {
    return <LoadingPage />;
  }

  const methods = useForm({
    defaultValues: user,
    resolver: zodResolver(editUserProfileSchema),
  });

  function action(data: FData) {
    const formData = new FormData();
    const file = data.avatar?.[0];
    if (file) {
      formData.append('avatar', file);
    }
    formData.append('firstName', data.firstName);
    formData.append('lastName', data.lastName);
    formData.append('location', data?.location || '');
    formData.append('phoneNumber', data?.phoneNumber || '');
    updateUser(formData);
  }

  return (
    <section className="p-4  ">
      <div className="bg-white  dark:bg-zinc-800 p-4 rounded-md shadow-md">
        <h2
          id="formTitle"
          className="mb-4 text-2xl font-semibold dark:text-slate-200"
        >
          Profile
        </h2>

        <FormProvider {...methods}>
          <form
            onSubmit={methods.handleSubmit(action)}
            aria-describedby="formTitle"
            method="post"
            encType="multipart/form-data"
          >
            <div className="w-full flex gap-3">
              <img className="w-40 h-36 rounded-md" src={fileUrl as string} />
              <div className="flex flex-col self-start gap-8">
                <h3 className="font-semibold text-xl dark:text-slate-200">
                  Upload your profile Photo
                </h3>
                <FormInput
                  name="avatar"
                  label="Select an image File (Max 0.5MB)"
                  type="file"
                  className=""
                  accept="image/*"
                  onChange={(e) => handleFileChange(e)}
                />
              </div>
            </div>
            <div className="mt-4 w-full grid gap-4 lg:grid-cols-2">
              <FormInput label="Name" name="firstName" />
              <FormInput label="Last Name" name="lastName" />
              <FormInput
                name="email"
                type="email"
                label="Email"
                disabled={true}
              />
              <FormInput name="location" label="Location" />
              <FormInput label="Phone Number" name="phoneNumber" />
            </div>
            <div className="flex justify-end mt-4">
              <Button
                category="success"
                classname="text-nowrap"
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
