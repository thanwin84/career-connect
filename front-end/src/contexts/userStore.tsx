import {produce} from 'immer'
// import { useEffect, useReducer, useMemo } from 'react'
import { Education, User } from '../types'
import { createStore } from '../utils/storeCreator'

export type UserStateType = {
    isLoggedIn: boolean
    userAvatar: string | null
    user: User | null
}



const initialUserState:UserStateType = {
    isLoggedIn: false,
    user: null,
    userAvatar: null
}
export const useUserStore = ()=>{
    return createStore(initialUserState, (setState)=>{
        return {
            addUser: (user:User)=>{
                console.log("add user called")
                setState(produce((draft)=>{
                    draft.user = user
                    draft.isLoggedIn = true
                    draft.userAvatar = user.avatar?.[0] as string
                }))
            },
            logoutUser: ()=>{
                setState(produce((draft)=>{
                    draft.user = null
                    draft.isLoggedIn = false
                    draft.userAvatar = null
                }))
            },
            toggleTwoStepAuthentication: ()=>{
                setState(produce(draft=>{
                    if (draft.user){
                        draft.user.twoStepAuthentication = !draft.user.twoStepAuthentication
                    }
                }))
            },
            addPhoneNumber:(phoneNumber:string)=>{
                setState(produce(draft=>{
                    if (draft.user){
                        draft.user.phoneNumber = phoneNumber
                    }
                }))
            },
            updateEducationRecord: (education: Education, id: string)=>{
                setState(produce(draft=>{
                    if (draft.user && draft.user.educationRecords){
                        draft.user.educationRecords = draft.user.educationRecords.map(record=> record._id === id ? education: record)
                        
                    }
                }))
            },
            addEducationRecord: (education: Education)=>{
                setState(produce(draft=>{
                    if (draft.user && draft.user.educationRecords){
                        draft.user.educationRecords.push(education)
                    }
                }))
            },
            deleteEducationRecord: (id: string)=>{
                setState(produce(draft=>{
                    if (draft.user && draft.user.educationRecords){
                        draft.user.educationRecords = draft.user.educationRecords.filter(record=> record._id !== id)
                    }
                }))
            },
            updateUserAvatar: (avatar: string[])=>{
                console.log("updateUserAvatar called")
                setState(produce(draft=>{
                    if (draft.user){
                        console.log("updated")
                        draft.user.avatar = avatar
                    }
                }))
            }
        }
    })
}
