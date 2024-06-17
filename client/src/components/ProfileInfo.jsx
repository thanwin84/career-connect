import React from "react";


export default function ProfileInfo({icon, text, iconClass, textClass}){
    return (
        <div className="flex gap-3">
            <span className={`text-blue-500 my-auto ${iconClass}`}>{icon}</span>
            <span className={`text-slate-700 dark:text-slate-300 ${textClass}`}>{text}</span>
        </div>
    )
}