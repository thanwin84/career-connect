import React from "react";
import { PersonalInformation, Education } from "../components";
import { useDashboardContext } from "./DashboardLayout";


export default function Profile(){
    const {user} = useDashboardContext()
   
    return (
        <div className="lg:w-4/6 py-6">
           <PersonalInformation {...user} className= "mb-4 ml-4" />
           <Education className= "ml-4" />
        </div>
    )
}