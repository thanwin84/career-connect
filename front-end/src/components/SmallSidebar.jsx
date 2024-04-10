import React from "react";
import { useDashboardContext } from "../pages/DashboardLayout";
import { FaTimes } from "react-icons/fa";
import {Logo, NavLinks, ModalContainer} from '../components'


export default function SmallSidebar({className}){
    const {showSmallSidebar, toggleSmallSidebar} = useDashboardContext()
    
    if (showSmallSidebar){
        return (
            <ModalContainer className={className}>
                <div className={`bg-white w-5/6 p-6 rounded-md`}>
                    <button 
                        onClick={toggleSmallSidebar}
                        className="text-red-500 hover:text-red-700"
                    >
                        <FaTimes size="1.4rem"/>
                    </button>
                    <header>
                        <Logo className="mx-auto w-44 pt-10"/>
                    </header>
                    <div className="p-20">
                        <NavLinks isSmallSidebar={true} />
                    </div>
                </div>
            </ModalContainer>
        )
    }
   
    
}