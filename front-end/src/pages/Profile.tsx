

import BasicInformation from "../components/profile/user_information/BasicInformation";
import { EducationContainer } from "../components/profile/education";
import { CrossButton, LoadingPage, Modal } from "../components/ui";
import ProfileHeader from "../components/profile/ProfileHeader";
import { useAppContext } from "../contexts/AppProvider";
import ProfileUpload from "../components/profile/ProfileUpload";



export default function Profile(){
   const {
    profileStore: {state:profileSate, actions:profileActions},
    userStore: {state: {user}}
} = useAppContext()
    
   if (!user){
    return (
        <LoadingPage/>
    )
   }

    return (
        <div className="py-6 px-4 ">
            <ProfileHeader user={user} className="mb-[6rem]" />
            <BasicInformation 
                    user={user}
                    className= "mb-4 lg:w-4/6 w-5/6 mx-auto" 
                />
                <EducationContainer className= "lg:w-4/6 w-5/6 mx-auto"/>
                <Modal isOpen={profileSate.profilePhotoUploadModal}>
                    <div className="relative w-[90%] md:w-[60%] mx-auto max-w-[500px]">
                        <CrossButton 
                            className="absolute right-4 top-10" 
                            action={profileActions.toggleProfileUploadModal} 
                        />
                        <ProfileUpload  />
                    </div>
                </Modal>
        </div>
    )
}
