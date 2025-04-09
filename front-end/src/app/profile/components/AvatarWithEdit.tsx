import { CanAccess } from '@/auth';
import { permissions } from '@/config/permissions';
import { useProfileStore } from '@/lib/store/ProfileStore';
import { CiEdit } from 'react-icons/ci';
import { FaUserCircle } from 'react-icons/fa';
import { useState } from 'react';

type Props = {
  className?: string;
  avatarUrl: string;
};

export default function AvatarWithEdit({ avatarUrl, className }: Props) {
  const profileStore = useProfileStore();
  const [imgError, setImgError] = useState(false);

  return (
    <div className={`relative ${className}`}>
      {!imgError && avatarUrl ? (
        <img
          className='w-28 h-28 object-cover rounded-full'
          src={avatarUrl}
          alt='Profile'
          onError={() => setImgError(true)}
        />
      ) : (
        <FaUserCircle className='w-28 h-28 text-slate-400' />
      )}

      <CanAccess requiredPermissions={[permissions.OTHER_USER_EDIT]}>
        <button
          onClick={profileStore.toggleProfileUploadModal}
          className='text-lg p-1 rounded-full absolute bottom-1 left-1/2 transform -translate-x-1/2 text-slate-700 bg-slate-200 hover:text-blue-600'
        >
          <CiEdit strokeWidth={2} />
        </button>
      </CanAccess>
    </div>
  );
}
