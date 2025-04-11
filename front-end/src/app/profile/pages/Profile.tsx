import { LoadingPage, Modal, CrossButton } from '@/components/ui';
import { useProfileStore } from '@/lib/store/ProfileStore';
import {
  BasicInformation,
  EducationContainer,
  ProfileHeader,
  ProfileUpload,
} from '@/app/profile/components';
import { useGetUserById } from '@/hooks/api';
import EditProfile from './EditProfile';
import { useUserStore } from '@/lib/store/userStore';

export default function Profile({ className }: { className?: string }) {
  const profileStore = useProfileStore();
  const userStore = useUserStore();
  const { isLoading } = useGetUserById();

  if (isLoading || !userStore.currentSelectedUser) {
    return <LoadingPage />;
  }

  return (
    <div className={`py-6 px-4 dark:bg-stone-800 ${className}`}>
      <ProfileHeader
        user={userStore.currentSelectedUser}
        className='mb-[6rem]'
      />
      <BasicInformation
        user={userStore.currentSelectedUser}
        className='mb-4 w-[90%] md:w-[50%] mx-auto'
      />
      <EducationContainer className=' w-[90%] md:w-[50%] mx-auto' />
      <Modal isOpen={profileStore.profilePhotoUploadModal}>
        <div className='relative w-[90%] md:w-[60%] mx-auto max-w-[500px]'>
          <CrossButton
            className='absolute right-5 top-3'
            action={profileStore.toggleProfileUploadModal}
          />
          <ProfileUpload />
        </div>
      </Modal>
      <Modal isOpen={profileStore.editUserModal}>
        <div className='w-[80%]  relative md:w-[50%] mx-auto'>
          <EditProfile />
          <CrossButton
            className='absolute right-5 top-9'
            action={profileStore.toggleEditUserModal}
          />
        </div>
      </Modal>
    </div>
  );
}
