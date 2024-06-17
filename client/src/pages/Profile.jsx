import React from "react";
import { 
    PersonalInformation, 
    EducationContainer 
} from "../components";
import { useDashboardContext } from "./DashboardLayout";


export default function Profile(){
    const {user} = useDashboardContext()
   
    return (
        <div className="py-6 px-4 ">
           <PersonalInformation {...user} className= "mb-4 lg:w-4/6 w-5/6" />
           <EducationContainer className= "lg:w-4/6 w-5/6" />
        </div>
    )
}