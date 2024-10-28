
export default function JobInfo({icon, text}){
    return (
        <div className="flex gap-2">
            <span className="my-auto">{icon}</span>
            <span className="dark:text-slate-300">{text}</span>
        </div>
    )
}