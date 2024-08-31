import React from "react";
import { 
    PersonalInformation, 
    EducationContainer,
    Spinner 
} from "../components";
import { useQuery } from "../hooks";
import { getUserInformation } from "../API";

export default function Profile(){
   const {data:user, isLoading} = useQuery(getUserInformation)
   if (isLoading){
    return (
        <div className="w-full pl-32 pt-32 h-screen items-center">
            <Spinner />
        </div>
    )
   }

    return (
        <div className="py-6 px-4 ">
           <PersonalInformation {...user} className= "mb-4 lg:w-4/6 w-5/6" />
           <EducationContainer
            user={user}
            className= "lg:w-4/6 w-5/6" 
            />
        </div>
    )
}