import { LovedIcon, LoveIcon } from "../../utils/Icons";
import {Button} from "../ui"
import { useFindJobsContext } from "../../pages/FindJobs";
import { IoMdArrowRoundBack } from "react-icons/io"
import { useForm } from "react-hook-form";
import {  Job } from "../../types";
import { useAppContext } from "../../contexts/AppProvider";
import { useCreateJobApplication } from "../../api/JobApplication";
import ObjectID from "bson-objectid";


type Props = {
    className?: string,
}

export default function JobDetails({
    className,
}:Props){

    const {currentJobDetails, toggleOpenDetails} = useFindJobsContext()
   
    const {
        company,
        position,
        jobType,
        jobLocation,
        country,
        salary,
        experianceLevel,
        isApplied,
        _id
        } = currentJobDetails as Job
        let loved = false
    const {handleSubmit} = useForm()
    const {userStore: {state:userState}} = useAppContext()
    const {createJobApplication, isPending, isSuccess} = useCreateJobApplication()
    const {addAppliedId} = useFindJobsContext()
    function onHandleSubmit(){
        const ob = {
            id: new ObjectID().toHexString(),
            candidateId: userState.user?._id,
            recruiterId: currentJobDetails?.createdBy,
            jobId: currentJobDetails?._id,
        }
        createJobApplication(ob)
    }

    
    return (
        <section className={`px-4 py-6 w-full min-h-screen bg-white dark:bg-zinc-900 ${className}`}>
            <button 
                className="text-2xl ml-2 hover:text-blue-600"
                onClick={toggleOpenDetails}
            >
                <IoMdArrowRoundBack  />
            </button>
            <div className="space-y-2 py-2 justify-center text-center border-b border-gray-300 dark:border-gray-500">
                
                <div className="mx-auto  bg-blue-700 text-white p-4 rounded-md w-16">
                    {company?.substring(0, 1).toUpperCase()}
                </div >
                    <h2 className="text-xl font-medium text-gray-700 dark:text-slate-200">{position}</h2>
                    <h4 className="text-blue-800 dark:text-blue-600">{company}</h4>
                </div>
            <div className="grid grid-cols-2 gap-2 px-4 py-4 border-b border-gray-300 dark:border-gray-500">
                <JobInfo
                    title= "Job Type"
                    description={jobType}
                />
                <JobInfo
                    title= "Experiance"
                    description={experianceLevel}
                />
                <JobInfo
                    title= "Location"
                    description={`${jobLocation},${country}`}
                />
                <JobInfo
                    title= "Salary"
                    description={`$ ${salary.min} - ${salary.max}`}
                />
            </div>
            <DetailsInfo />
            <div className="flex gap-6 justify-center mt-4">
                {(isSuccess || isApplied) ? <span className="px-6 py-2 border bg-green-300 text-green-900">Applied</span>: (
                    <form onSubmit={handleSubmit(onHandleSubmit)}>
                        <Button
                            category="success"
                            classname= ""
                            type="submit"
                            loading={isPending}
                            onClick={()=>addAppliedId(_id)}
                        >
                            Apply Now
                        </Button>
                </form>
                )}
                
                <span className="text-2xl text-red-500 my-auto">
                    {loved ? <LovedIcon/>: <LoveIcon/>}
                </span>
            </div>

        </section>
    )
}
type JobInfoType = {
    title: string
    description: string
}
function JobInfo({title, description}:JobInfoType){
    return (
        <div className="flex flex-col gap-1">
            <span className="text-gray-500 dark:text-gray-400">{title}</span>
            <span className="text-slate-900 dark:text-slate-200 font-semibold">{description}</span>
        </div>
    )
}

function DetailsInfo(){
    return (
        <div className="p-4 border-b border-gray-300 dark:border-gray-500 ">
            <h2 className="text-gray-700 dark:text-slate-200 font-semibold">Description</h2>
            <p className="dark:text-slate-400 pt-2 text-justify">Astha IT is seeking a talented and passionate Software Engineer to join our dynamic development team in Dhaka. As a Software Engineer, you will be responsible for designing, developing, and maintaining software solutions that are scalable, efficient, and secure. You will work closely with cross-functional teams to deliver high-quality products that meet the needs of our clients</p>
        </div>
    )
}