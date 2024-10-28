import { produce } from "immer"
import { createStore } from "../utils/storeCreator"
import { Education } from "../types"

type ProfileStateType = {
    addEducationModal: boolean
    editEducationModal: boolean
    selectedEducationRecord: Education | null
}

const profileInitialState:ProfileStateType = {
    addEducationModal: false,
    editEducationModal: false,
    selectedEducationRecord: null
}

export const useProfileStore = ()=>{
    return createStore(
        profileInitialState,
        (setState)=>{
            return {
                toggleAddEducationModal: ()=>{
                    setState(produce(draft=>{
                        draft.addEducationModal = !draft.addEducationModal
                    }))
                },
                toggleEditEducationModal: ()=>{
                    setState(produce(draft=>{
                        draft.editEducationModal = !draft.editEducationModal
                        if (!draft.editEducationModal){
                            draft.selectedEducationRecord = null
                        }
                        
                    }))
                },
                handleSetEducationRecord: (record:Education)=>{
                    setState(produce(draft=>{
                        draft.selectedEducationRecord = record
                    }))
                },
                resetSelectedEducationRecord: ()=>{
                    setState(produce(draft=>{
                        draft.selectedEducationRecord = null
                    }))
                }
            }
        }
    )
}