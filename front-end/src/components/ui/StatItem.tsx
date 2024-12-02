import { ReactNode } from "react"

type Props = {
    icon: ReactNode
    count: number
    title: string
    color: "orange" | "blue" | "red"
    className?: string,
    id?: string
}

export default function StatItem({icon, count, title, color, className, id}:Props){
    const colors = {
        orange: {
            border: "border-orange-400",
            text: "text-orange-500",
            icon: "text-orange-600",
            iconBg: "bg-orange-100"
        },
        blue: {
            border: "border-blue-400",
            text: "text-blue-500",
            icon: "text-blue-600",
            iconBg: "bg-blue-100"
        },
        red: {
            border: "border-red-400",
            text: "text-red-500",
            icon: "text-red-600",
            iconBg: "bg-red-100"
        }
    } 
    
    return (
        <div  className={`w-full p-6 bg-white dark:bg-zinc-800 rounded-md flex flex-col  gap-4 text-2xl border-b-4 ${className}  ${colors[color]?.border}  `}>
            <div className="flex justify-between">
                <span className={`font-bold  ${colors[color]?.text} my-auto`}>{count}</span>
                <div className={`my-auto ${colors[color]?.iconBg} rounded-sm p-4`}>
                <span className={`${colors[color]?.icon}  my-auto`}>{icon}</span>
                </div>
            </div>
            <div>
                <span id={id} className="text-xl dark:text-slate-100">{title}</span>
            </div>
        </div>
    )
}
