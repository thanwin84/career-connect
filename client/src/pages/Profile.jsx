import React, { createContext, useContext, useState } from "react";
import { 
    PersonalInformation, 
    EducationContainer,
    Spinner 
} from "../components";
import { useQuery } from "../hooks";
import { getUserInformation } from "../API";

const profileContext = createContext()

export default function Profile(){
   const {data:user, isLoading, refetch} = useQuery(getUserInformation)
   const [addEducationModal, setAddEducationModal] = useState(false)
    
    function toggleAddEducationModal(){
        setAddEducationModal(!addEducationModal)
    }
   if (isLoading){
    return (
        <div className="w-full pl-32 pt-32 h-screen items-center">
            <Spinner />
        </div>
    )
   }

    return (
        <div className="py-6 px-4 ">
           <profileContext.Provider value={{
            refetch,
            addEducationModal,
            toggleAddEducationModal
           }} >
            <PersonalInformation {...user} className= "mb-4 lg:w-4/6 w-5/6" />
            <EducationContainer
                    user={user}
                    className= "lg:w-4/6 w-5/6"
                />
           </profileContext.Provider>
        </div>
    )
}

export const useProfileContext = ()=> useContext(profileContext)