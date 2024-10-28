
import {toast} from 'react-toastify'
import {redirect, useLoaderData} from 'react-router-dom'
import { FaSuitcaseRolling, FaCalendarCheck } from 'react-icons/fa';
import {
    StatItem
} from "../components/ui"
import { UsersContainer } from '../containers/admin';
import { getApplicationStatsRequest } from '../apiRequest';
import { GetApplicationStatsResponse } from '../types';

export const loader = async()=>{
    try {
        const data = await getApplicationStatsRequest() 
        return data
    } catch (error) {
        toast.error("You are allowed to access this route", {autoClose: 3000})
        return redirect("/dashboard")
    }
}

type Props = {
    className?: string
}


export default function Admin({}:Props){
    const {users, jobs} = useLoaderData() as GetApplicationStatsResponse
    
    return (
        
        <section>
            <div className="p-6 flex gap-4">
                <StatItem
                    count={users}
                    title="Current User"
                    icon={<FaSuitcaseRolling/>}
                    color="orange"
                />
                <StatItem
                    count={jobs}
                    title="Total Jobs"
                    icon={<FaCalendarCheck />}
                    color = "blue"
                />
            </div>
            <UsersContainer className="p-6" />
        </section>
    )
}
