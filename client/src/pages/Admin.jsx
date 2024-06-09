import React from "react";
import {toast} from 'react-toastify'
import customFetch from '../utils/customFetch'
import {redirect, useLoaderData} from 'react-router-dom'
import { FaSuitcaseRolling, FaCalendarCheck } from 'react-icons/fa';
import StatItem from "../components/StatItem";

export const loader = async()=>{
    try {
        const response = await customFetch.get("/users/admin/app-stats")
       
        return response.data
    } catch (error) {
        toast.error("You are allowed to access this route", {autoClose: 3000})
        return redirect("/dashboard")
    }
}

export default function Admin(){
    const {users, jobs} = useLoaderData()
    
    return (
        <div className=" bg-slate-100 p-6 flex gap-4">
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
    )
}