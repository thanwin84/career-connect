import { CiEdit } from "react-icons/ci";
import { useAppContext } from "../../contexts/AppProvider";

type Props = {
  className?: string;
  avatarUrl: string;
};

export default function AvatarWithEdit({ avatarUrl, className }: Props) {
  const {
    profileStore: { actions: profileActions },
  } = useAppContext();
  return (
    <div className={`relative ${className}`}>
      <img
        className="w-28 h-28 object-cover rounded-full"
        src={avatarUrl}
        alt=""
      />
      <button
        onClick={profileActions.toggleProfileUploadModal}
        className="text-lg p-1 rounded-full absolute bottom-1 left-1/2 transform -translate-x-1/2 text-slate-700 bg-slate-200 hover:text-blue-600"
      >
        <CiEdit strokeWidth={2} />
      </button>
    </div>
  );
}
