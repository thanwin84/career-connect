import React from "react";
import { FaSuitcaseRolling, FaCalendarCheck, FaBug, FaCentercode } from 'react-icons/fa';
import StatItem from "../components/StatItem";

export default function StatsContainer({defaultStats}){
    const {pending, interview, declined} = defaultStats

    return (
        <section className="p-6 flex gap-6 flex-col lg:flex-row justify-center">
            <StatItem 
             title= "Pending Applications"
             count = {pending}
             color="orange"
             icon = {<FaSuitcaseRolling />}
             className= "w-full"
            />
            <StatItem 
             title= "Interview Scheduled"
             count = {interview}
             color="blue"
             icon = {<FaCalendarCheck />}
             className= "w-full"
            />
            <StatItem 
             title= "Jobs Declined"
             count = {declined}
             color="red"
             icon = {<FaBug />}
             className= "w-full"
            />
        </section>
    )
}