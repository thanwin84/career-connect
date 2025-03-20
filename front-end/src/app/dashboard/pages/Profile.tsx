import { EducationContainer } from '../components/profile/education';
import { CrossButton, LoadingPage, Modal } from '../../../components/ui';
import ProfileHeader from '../components/profile/ProfileHeader';
import { useUserStore } from '../../../lib/store/userStore';
import { useProfileStore } from '../../../lib/store/ProfileStore';
import ProfileUpload from '../components/profile/ProfileUpload';
import { BasicInformation } from '../components/profile/user_information';

export default function Profile() {
  const userStore = useUserStore();
  const profileStore = useProfileStore();
  if (!userStore.user) {
    return <LoadingPage />;
  }

  return (
    <div className="py-6 px-4 ">
      <ProfileHeader user={userStore.user} className="mb-[6rem]" />
      <BasicInformation
        user={userStore.user}
        className="mb-4 lg:w-4/6 w-5/6 mx-auto"
      />
      <EducationContainer className="lg:w-4/6 w-5/6 mx-auto" />
      <Modal isOpen={profileStore.profilePhotoUploadModal}>
        <div className="relative w-[90%] md:w-[60%] mx-auto max-w-[500px]">
          <CrossButton
            className="absolute right-4 top-10"
            action={profileStore.toggleProfileUploadModal}
          />
          <ProfileUpload />
        </div>
      </Modal>
    </div>
  );
}
