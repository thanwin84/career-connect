
import { MdEmail } from "react-icons/md"
import ProfileInfo from "./ProfileInfo";
import { CiLocationOn } from "react-icons/ci"
import { IoPersonOutline } from "react-icons/io5"
import { CiMobile2 } from "react-icons/ci"
import { CiEdit } from "react-icons/ci"
import { Link } from "react-router-dom";
import { User, UserRole } from "../../types";

type Props = {
    className?: string
    user: User
}

export default function PersonalInformation({
    user,
    className
}:Props){
   const {
    name, 
    email, 
    lastName, 
    avatar, 
    location, 
    role, 
    phoneNumber
} = user
    return (
        <section  className={`bg-white dark:bg-zinc-900 w-full rounded-md shadow-md px-8 py-6 ${className}`}>
            <div className="flex justify-between mb-3">
                <h2 className="text-xl font-bold text-slate-800 dark:text-slate-300">Personal Information</h2>
                <Link
                    aria-label="click to edit profile information"
                    to="../profile/edit"
                    className="my-auto text-xl dark:text-slate-200 hover:text-slate-900 font-bold"
                >
                    <CiEdit/>
                </Link>
            </div>
            {/* side */}
            <div className="flex  justify-between">
                <div className="">
                    {avatar && (
                        <img 
                            src={avatar[0]} 
                            alt="profile pic" 
                            className="w-36 h-36 object-cover rounded-sm" 
                        />
                    )}
                    <p 
                        className="text-base mt-2 text-center font-semibold text-gray-600 dark:text-slate-200 my-auto"
                    >
                        {name.slice(0,1).toUpperCase() + name.slice(1)} {lastName}
                    </p>
                </div>
                <div className="space-y-2">
                    <ProfileInfo icon={<MdEmail/>} text={email} />
                    <ProfileInfo icon={<CiLocationOn/>} text={location || "Not present"} />
                    <ProfileInfo icon={<IoPersonOutline/>} text={role as UserRole}/>
                    <ProfileInfo icon={<CiMobile2/>} text={phoneNumber || "not present"} />
                </div>
            </div>
           
        </section>
    )
}


