import { CiEdit } from "react-icons/ci";
import { useProfileStore } from "../../store/ProfileStore";

type Props = {
  className?: string;
  avatarUrl: string;
};

export default function AvatarWithEdit({ avatarUrl, className }: Props) {
  const profileStore = useProfileStore();
  return (
    <div className={`relative ${className}`}>
      <img
        className="w-28 h-28 object-cover rounded-full"
        src={avatarUrl}
        alt=""
      />
      <button
        onClick={profileStore.toggleProfileUploadModal}
        className="text-lg p-1 rounded-full absolute bottom-1 left-1/2 transform -translate-x-1/2 text-slate-700 bg-slate-200 hover:text-blue-600"
      >
        <CiEdit strokeWidth={2} />
      </button>
    </div>
  );
}
