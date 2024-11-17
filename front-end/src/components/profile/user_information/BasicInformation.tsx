import { CiEdit } from "react-icons/ci"
import { CgProfile } from "react-icons/cg";
import { Link } from "react-router-dom";
import { User } from "../../../types";
import {Heading, BasicInfo} from "./index"


type Props = {
    className?: string
    user: User
}

export default function BasicInformation({
    user,
    className
}:Props){
   const {
    email, 
    location, 
    role, 
    phoneNumber
} = user
    return (
        <section  className={`bg-white dark:bg-zinc-900 w-full rounded-md shadow-md px-8 py-6 ${className}`}>
            <div className="flex justify-between mb-4">
                <Heading
                    icon={<CgProfile/>}
                    content="Basic Information"
                />
                <Link
                    aria-label="click to edit profile information"
                    to="../profile/edit"
                    className="my-auto text-xl dark:text-slate-200 hover:text-blue-900 hover:font-bold font-bold hover:text-2xl"
                >
                    <CiEdit/>
                </Link>
            </div>
            <div className="grid grid-cols-2 py-2 gap-2">
                <BasicInfo label="Email" text={email} />
                <BasicInfo label="Gender" text="Male" />
                <BasicInfo label="Phone Number" text={phoneNumber ? phoneNumber: "Not Present"} />
                <BasicInfo label="Location" text={location as string} />
                <BasicInfo label="User role" text={role as string} />
            </div>
        </section>
    )
}


