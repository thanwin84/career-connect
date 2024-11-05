import { FaSuitcaseRolling, FaCalendarCheck, FaBug } from 'react-icons/fa';
import {StatItem} from "../ui";

type Props = {
    defaultStats: {
        "pending": number
        "interview": number,
        "declined": number
    }
}
export default function StatsContainer({defaultStats}:Props){
    const {pending, interview, declined} = defaultStats

    return (
        <ul 
            className="p-6 flex gap-6 flex-col lg:flex-row justify-center"
            aria-label="Job application statistics"
        >
            <li  className='w-full'>
                <StatItem 
                    title= "Pending Applications"
                    count = {pending}
                    color="orange"
                    icon = {<FaSuitcaseRolling />}
                />
            </li>
            <li className='w-full'>
                <StatItem 
                title= "Interview Scheduled"
                count = {interview}
                color="blue"
                icon = {<FaCalendarCheck />}
                />
            </li>
            <li className='w-full'>
                <StatItem 
                title= "Jobs Declined"
                count = {declined}
                color="red"
                icon = {<FaBug />}
                />
            </li>
        </ul>
    )
}