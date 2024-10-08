import React, { createContext, useState, useContext } from "react";
import { logoutUser } from "../API";

const MainContext = createContext()


export function CentralProvider({children}){
    const [user, setUser] = useState(()=>{
        const savedUser = localStorage.getItem('user')
        return savedUser ? JSON.parse(savedUser): null
    })

    function login(userData){
        setUser(userData)
        localStorage.setItem('user', JSON.stringify(userData))
    }
    const logout = async()=>{
        setUser(null)
        localStorage.removeItem('user')
        logoutUser()
    }
    return (
        <MainContext.Provider value={{
            user,
            login,
            logout
        }}>
            {children}
        </MainContext.Provider>
    )

}

export const useMainContext = ()=> useContext(MainContext)