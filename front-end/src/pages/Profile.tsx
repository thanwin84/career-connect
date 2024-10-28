

import PersonalInformation from "../components/user_information/PersonalInformation";
import { EducationContainer } from "../components/education";
import { LoadingPage } from "../components/ui";
import { useUserInformation } from "../api/UserApi";



export default function Profile(){
   const {user, isLoading} = useUserInformation()
   
    
   if (isLoading || !user){
    return (
        <LoadingPage/>
    )
   }

    return (
        <div className="py-6 px-4 ">
           <PersonalInformation 
                user={user}
                className= "mb-4 lg:w-4/6 w-5/6" 
             />
            <EducationContainer className= "lg:w-4/6 w-5/6"/>
        </div>
    )
}
