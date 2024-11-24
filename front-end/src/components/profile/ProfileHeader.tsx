import { useAppContext } from "../../contexts/AppProvider";
import { User } from "../../types";
import { CiEdit } from "react-icons/ci"
type Props = {
  className?: string;
  user: User
};
const url = "https://res.cloudinary.com/dlxptkhle/image/upload/c_fill,g_auto,h_250,w_970/b_rgb:000000,e_gradient_fade,y_-0.50/c_scale,co_rgb:ffffff,fl_relative,l_text:montserrat_25_style_light_align_center:Shop%20Now,w_0.5,y_0.18/v1731775384/Black_and_White_Silhouette_Motivational_Quotes_Facebook_Cover_xmmkb7.png"
export default function ProfileHeader({user, className}: Props) {
    const {profileStore: {actions: profileActions}} = useAppContext()
  return (
    <div className={`relative ${className}`}>
        <img className="mx-auto rounded-md" src={url} alt='cover photo' />
        <div className="flex absolute gap-4 left-2 md:left-8 -bottom-14">
            <div className="relative">
                <img className="w-28 h-28  rounded-full" src={user?.avatar?.[0]} alt="" />
                <button
                    onClick={profileActions.toggleProfileUploadModal}
                    className= "text-lg p-1 rounded-full absolute bottom-1 left-1/2 transform -translate-x-1/2 text-slate-700 bg-slate-200 hover:text-blue-600"
                >
                    <CiEdit strokeWidth={2} />
                </button>
            </div>
            <div className="flex flex-col justify-end">
                <p className="text-lg uppercase font-semibold text-slate-800 dark:text-slate-200">{user.name} {user.lastName}</p>
                <p className="text-slate-700 dark:text-slate-300">Your title</p>
            </div>
        </div>
    </div>
  );
}