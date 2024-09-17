import React from "react";

export default function CompleteSteps({totalSteps, currentStep, titles, className}){
    
    return (
        <div className={`w-full bg-slate-50 dark:bg-zinc-900 ${className}`}>
            <div className="text-xl font-semibold">
                <span className="dark:text-slate-200">{totalSteps === currentStep + 1 ? "Final step": `Step ${currentStep + 1}`}</span>
                <span className="ml-4 text-slate-600 dark:text-slate-400">{titles[currentStep]}</span>
            </div>
            <div className="py-2 flex gap-2">
                {titles.map((value, index)=>(
                    <span key={value} className={`bg-blue-200 px-1 h-2 w-full rounded-md ${currentStep === index ? "bg-blue-600": ""}`}></span>
                ))}
            </div>
        </div>
    )
}