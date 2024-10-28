import { 
    createContext, 
    useContext, 
    useState 
} from "react";

import PersonalInformation from "../components/user_information/PersonalInformation";
import { EducationContainer } from "../components/education";
import { Spinner } from "../components/ui";
import { useUserInformation } from "../api/UserApi";

const profileContext = createContext() 

export default function Profile(){
   const {user, isLoading} = useUserInformation()
   const [addEducationModal, setAddEducationModal] = useState(false)
   const [editEducationModal, setEditEducationModal] = useState(false)
   const [selectedEducationRecord, setSelectedEducationRecord] = useState('')


    function toggleAddEducationModal(){
        setAddEducationModal(!addEducationModal)
    }
    function handleSetEducationRecord(value){
        setSelectedEducationRecord(value)
    }

    function toggleEditEducationModal(){
        setEditEducationModal(!editEducationModal)
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
                addEducationModal,
                toggleAddEducationModal,
                editEducationModal,
                selectedEducationRecord,
                toggleEditEducationModal,
                handleSetEducationRecord
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