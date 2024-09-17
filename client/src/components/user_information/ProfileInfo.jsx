


export default function ProfileInfo({icon, text, iconClass, textClass}){
    return (
        <div className="flex gap-3">
            <span className={`text-blue-500 my-auto ${iconClass}`}>{icon}</span>
            <span className={`font-serif text-gray-700 dark:text-slate-300 tracking wide ${textClass}`}>{text}</span>
        </div>
    )
}