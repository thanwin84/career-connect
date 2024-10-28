import { useState } from "react";

export type SettingStateType = {
    openModal: boolean
    selectedCountry: {name: string, code: string}
}

export const settingInitialState:SettingStateType = {
    openModal: false,
    selectedCountry: {name: "Bangladesh", code: "+88"}
}



export const useSettingStore = () => {
    const [state, setState] = useState(settingInitialState)
    
    const actions = {
        toggleOpenModal: ()=>{
            setState(prev => ({...prev, openModal: !state.openModal}))
        },
        onSelectCountry: (value: {name: string, code: string})=>{
            setState(prev => ({...prev, selectedCountry: value}))
        }
    }
    return {
        state: state,
        actions: actions
    }

};

