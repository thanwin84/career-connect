import { 
    DateRangeIcon, 
    DollarIcon, 
    LocationIcon, 
    LoveIcon, 
    LovedIcon 
} from "../../utils/Icons"
import Button from "../ui/Button"
import { useFindJobsContext } from "../../pages/FindJobs"

function dateFormate(date){
    const months = [
        "January", 
        "February", 
        "March", 
        "April", 
        "May", 
        "June", 
        "July", 
        "August", 
        "September", 
        "October", 
        "November", 
        "December"
      ];
      
    const dateObject = new Date(date)
    const day = dateObject.getDay()
    const month = dateObject.getMonth()
    const year = dateObject.getFullYear()
    return `${day+1}th ${months[month]}, ${year}`
}

export default function JobCard({
    className,
    ...props
}){
    const {
        handleCurrentJobDetails,
        currentJobDetails,
        toggleOpenDetails
    } = useFindJobsContext()
    const {
        company,
        position,
        jobType,
        country,
        jobLocation,
        salary,
        createdAt,
        save,
        experianceLevel,
        _id
    } = props
    const date = dateFormate(createdAt)

    function handleClick(){
        handleCurrentJobDetails({
            company,
            position,
            country,
            jobLocation,
            salary,
            createdAt,
            save,
            experianceLevel,
            _id,
            jobType
        })
        toggleOpenDetails()
        
    }
    
    return (
        <article 
            className={`w-full bg-white dark:bg-zinc-900 border rounded-md  hover:border-blue-400 hover:border-2 ${className} ${_id === currentJobDetails._id ? "border-2 border-blue-700": "border-gray-200"}`}
        >
            <header className="flex justify-between mx-4 py-2 border-b border-gray-300">
                <div className="flex">
                    <div className="mr-4 bg-blue-700 text-white p-4 rounded-md">
                        {company?.substring(0, 1).toUpperCase()}
                    </div>
                    <div className="">
                        <h2 className="font-semibold text-gray-700 dark:text-slate-200">{position}</h2>
                        <h3 className="text-blue-800 dark:text-blue-600 ">{company}</h3>
                    </div>
                </div>
                <div className="my-auto">
                    <button 
                        className={`outline-none cursor-pointer text-xl ${save ? "text-red-500": "text-red-500"}`}
                    >
                        {save ? <LovedIcon/>: <LoveIcon/>}
                    </button>
                </div>
            </header>
            <div className="mx-4 py-3">
                <p className="flex gap-4">
                    <span className="my-auto dark:text-slate-200"><LocationIcon/></span>
                    <span className="text-slate-700 dark:text-slate-300">{`${jobLocation}, ${country}`}</span>
                </p>
                <p className="flex gap-4">
                    <span className="my-auto dark:text-slate-200"><DollarIcon/></span>
                    <span className="text-slate-700 dark:text-slate-300">{`$${salary.min} - $${salary.max}`}</span>
                </p>
            </div>
            <div className="py-3 flex  justify-between">
                <p className="flex  gap-2 mx-4 text-sm text-gray-500">
                    <span className="my-auto dark:text-slate-300"><DateRangeIcon/></span>
                    <span className="my-auto dark:text-slate-400">{date}</span>
                </p>
                <div className="mr-4">
                <Button
                    category="success"
                    classname=""
                    onClick={handleClick}
                >
                    See Details
                </Button>
                </div>
            </div>
        </article>
    )
}