import { LoadingPage, Modal, CrossButton } from '@/components/ui';
import { useProfileStore } from '@/lib/store/ProfileStore';
import {
  BasicInformation,
  EducationContainer,
  ProfileHeader,
  ProfileUpload,
} from '@/app/profile/components';
import { useGetUserById } from '@/hooks/api';

export default function Profile() {
  const profileStore = useProfileStore();
  const { data, isLoading } = useGetUserById();
  const user = data?.data;

  if (isLoading || !user) {
    return <LoadingPage />;
  }

  return (
    <div className='py-6 px-4 dark:bg-stone-800'>
      <ProfileHeader user={user} className='mb-[6rem]' />
      <BasicInformation user={user} className='mb-4 lg:w-4/6 w-5/6 mx-auto' />
      <EducationContainer className='lg:w-4/6 w-5/6 mx-auto' />
      <Modal isOpen={profileStore.profilePhotoUploadModal}>
        <div className='relative w-[90%] md:w-[60%] mx-auto max-w-[500px]'>
          <CrossButton
            className='absolute right-5 top-3'
            action={profileStore.toggleProfileUploadModal}
          />
          <ProfileUpload />
        </div>
      </Modal>
    </div>
  );
}
