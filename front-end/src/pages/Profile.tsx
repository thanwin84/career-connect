

import BasicInformation from "../components/profile/user_information/BasicInformation";
import { EducationContainer } from "../components/profile/education";
import { CloseModal, LoadingPage, ModalContainer } from "../components/ui";
import { useUserInformation } from "../api/UserApi";
import ProfileHeader from "../components/profile/ProfileHeader";
import { useAppContext } from "../contexts/AppProvider";
import ProfileUpload from "../components/profile/ProfileUpload";



export default function Profile(){
   const {user, isLoading} = useUserInformation()
   const {profileStore: {state:profileSate, actions:profileActions}} = useAppContext()
    
   if (isLoading || !user){
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
            {profileSate.profilePhotoUploadModal && (
                <ModalContainer modelClassName="mx-auto">
                    <CloseModal handleOpenModal={profileActions.toggleProfileUploadModal}>
                        <ProfileUpload className="rounded-md w-[80%] md:w-[60%] lg:w-[40%] mx-auto" user={user} />
                    </CloseModal>
                </ModalContainer>
            )}
        </div>
    )
}
