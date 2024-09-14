import React from "react";
import { MdEmail } from "react-icons/md"
import ProfileInfo from "./ProfileInfo";
import { CiLocationOn } from "react-icons/ci"
import { IoPersonOutline } from "react-icons/io5"
import { CiMobile2 } from "react-icons/ci"
import { CiEdit } from "react-icons/ci"
import { Link } from "react-router-dom";

export default function PersonalInformation({
    name, 
    email, 
    lastName, 
    avatar, 
    location, 
    role, 
    phoneNumber, 
    className
}){
   
    return (
        <div className={`bg-white dark:bg-zinc-900 w-full rounded-md shadow-md p-6 ${className}`}>
            <div className="flex justify-between">
                <h2 className="text-xl font-bold text-slate-800 dark:text-slate-300">Personal Information</h2>
                
                <Link
                    to="../profile/edit"
                    className="my-auto text-xl dark:text-slate-200 hover:text-slate-900 font-bold"
                >
                <CiEdit/>
                </Link>
            </div>
           <div className=" flex gap-6 justify-end">
            <div className="w-16 h-16 rounded-md overflow-hidden">
                <img src={avatar[0]} alt="profile pic" className="w-full h-full object-cover" />
            </div>
            <h4 className="text-xl font-semibold text-slate-900 dark:text-slate-200 my-auto">{name}</h4>
           </div>
           <div className="py-1">
            <ProfileInfo icon={<MdEmail/>} text={email} />
            <ProfileInfo icon={<CiLocationOn/>} text={location} />
            <ProfileInfo icon={<IoPersonOutline/>} text={role}/>
            <ProfileInfo icon={<CiMobile2/>} text={phoneNumber || "not present"} />
           </div>
        </div>
    )
}