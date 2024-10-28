
import day from "dayjs";
import advancedFormat from 'dayjs/plugin/advancedFormat';
day.extend(advancedFormat);
import JobInfo from "./JobInfo";
import { Link, Form, useNavigation } from "react-router-dom";
import Button from "../ui/Button";
import { 
    LocationArrowIcon,
    BriefcaseIcon,
    CalenderIcon 
} from "../../utils/Icons";

export default function JobCard({
    _id,
    position,
    company,
    jobLocation,
    jobType,
    createdAt,
    jobStatus
}){
    const styles = {
        interview: "bg-green-100 text-green-500",
        pending: "bg-orange-100 text-orange-500",
        declined: "bg-red-100 text-red-500"
    }
    const date = day(createdAt).format('MMM Do, YYYY')
    const navagation = useNavigation()
    
    return (
        <section className="p-4 rounded-md mb-2 shadow-md bg-white dark:bg-zinc-900">
           <header className="flex border-b border-b-slate-200 p-4">
            <div className="mr-4 bg-blue-700 text-white p-4 rounded-md">
                {company.substring(0, 1).toUpperCase()}
            </div>
            <div className="">
                <h4 className="text-xl dark:text-slate-100">{position}</h4>
                <h4 className="text-slate-600  dark:text-slate-200">{company}</h4>
            </div>
           </header>
           <div className="p-4 grid grid-cols-2 gap-y-3"> 
                <JobInfo 
                    icon={<LocationArrowIcon className="text-blue-600"/>} 
                    text={jobLocation} 
                />
                <JobInfo 
                    icon={<CalenderIcon className="text-blue-600"/>} 
                    text={date} 
                />
                <JobInfo 
                    icon={<BriefcaseIcon className="text-blue-600"/>} 
                    text={jobType} 
                />
                <div className="">
                    <span className={`px-4 py-1  rounded-sm ${styles[jobStatus]}`}>{jobStatus.substring(0, 1).toUpperCase()+ jobStatus.substring(1)}</span>
                </div>
           </div>
           <div className="flex gap-2 px-4">
            <Link
                to={`../edit-job/${_id}`}
                className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md text-sm"
            >
                Edit
            </Link>
            <Form method="post" action={`../delete-job/${_id}`}>
                <Button 
                    type="submit"
                    classname="text-sm"
                    loading={navagation.state === "loading"}
                    loadingText="loading"
                >
                    Delete
                </Button>
            </Form>
           </div>
        </section>
    )
}