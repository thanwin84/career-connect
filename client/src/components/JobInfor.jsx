import React from "react";

export default function JobInfo({icon, text}){
    return (
        <div className="flex gap-2">
            <span className="my-auto">{icon}</span>
            <span>{text}</span>
        </div>
    )
}