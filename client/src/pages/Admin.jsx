import {toast} from 'react-toastify'
import customFetch from '../utils/customFetch'
import {redirect, useLoaderData} from 'react-router-dom'
import { FaSuitcaseRolling, FaCalendarCheck } from 'react-icons/fa';
import {
    StatItem
} from "../components/ui"
import {UsersContainer} from '../components/admin'

export const loader = async()=>{
    try {
        const {data} = await customFetch.get("/users/admin/app-stats")
       
        return data
    } catch (error) {
        toast.error("You are allowed to access this route", {autoClose: 3000})
        return redirect("/dashboard")
    }
}



export default function Admin(){
    const {users, jobs} = useLoaderData()
    
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
