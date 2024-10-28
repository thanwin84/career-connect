
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
import { Job } from "../../types";

type Props = {
    job:Job
}
 
export default function JobCard({
    job
}:Props){
    const styles = {
        interview: "bg-green-100 text-green-500",
        pending: "bg-orange-100 text-orange-500",
        declined: "bg-red-100 text-red-500"
    }
    const date = day(job.createdAt).format('MMM Do, YYYY')
    const navagation = useNavigation()
    
    return (
        <section className="p-4 rounded-md mb-2 shadow-md bg-white dark:bg-zinc-900">
           <header className="flex border-b border-b-slate-200 p-4">
            <div className="mr-4 bg-blue-700 text-white p-4 rounded-md">
                {job.company.substring(0, 1).toUpperCase()}
            </div>
            <div className="">
                <h4 className="text-xl dark:text-slate-100">{job.position}</h4>
                <h4 className="text-slate-600  dark:text-slate-200">{job.company}</h4>
            </div>
           </header>
           <div className="p-4 grid grid-cols-2 gap-y-3"> 
                <JobInfo 
                    icon={<LocationArrowIcon className="text-blue-600"/>} 
                    text={job.jobLocation} 
                />
                <JobInfo 
                    icon={<CalenderIcon className="text-blue-600"/>} 
                    text={date} 
                />
                <JobInfo 
                    icon={<BriefcaseIcon className="text-blue-600"/>} 
                    text={job.jobType} 
                />
                <div className="">
                    <span className={`px-4 py-1  rounded-sm ${styles[job.jobStatus]}`}>{job.jobStatus.substring(0, 1).toUpperCase()+ job.jobStatus.substring(1)}</span>
                </div>
           </div>
           <div className="flex gap-2 px-4">
            <Link
                to={`../edit-job/${job._id}`}
                className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md text-sm"
            >
                Edit
            </Link>
            <Form method="post" action={`../delete-job/${job._id}`}>
                <Button 
                    type="submit"
                    classname="text-sm"
                    loading={navagation.state === "submitting"}
                    loadingText="loading"
                >
                    Delete
                </Button>
            </Form>
           </div>
        </section>
    )
}