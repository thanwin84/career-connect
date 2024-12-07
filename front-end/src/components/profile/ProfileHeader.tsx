import { User } from "../../types";
import AvatarWithEdit from "./AvatarWithEdit";
type Props = {
  className?: string;
  user: User;
};
const url =
  "https://res.cloudinary.com/dlxptkhle/image/upload/c_fill,g_auto,h_250,w_970/b_rgb:000000,e_gradient_fade,y_-0.50/c_scale,co_rgb:ffffff,fl_relative,l_text:montserrat_25_style_light_align_center:Shop%20Now,w_0.5,y_0.18/v1731775384/Black_and_White_Silhouette_Motivational_Quotes_Facebook_Cover_xmmkb7.png";
export default function ProfileHeader({ user, className }: Props) {
  return (
    <div className={`relative ${className}`}>
      <img className="mx-auto rounded-md" src={url} alt="cover photo" />
      <div className="flex absolute gap-4 left-2 md:left-8 -bottom-14">
        <AvatarWithEdit avatarUrl={user?.avatar?.url as string} />
        <div className="flex flex-col justify-end">
          <p className="text-lg uppercase font-semibold text-slate-800 dark:text-slate-200">
            {user.firstName} {user.lastName}
          </p>
          <p className="text-slate-700 dark:text-slate-300">Your title</p>
        </div>
      </div>
    </div>
  );
}
