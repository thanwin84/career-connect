import React from "react";
import { useDashboardContext } from "../pages/DashboardLayout";
import { FaTimes } from "react-icons/fa";
import {Logo, NavLinks} from '../components'


export default function SmallSidebar({className}){
    const {showSidebar, toggleSidebar} = useDashboardContext()


    if (showSidebar){
        return (
            <section className={`fixed inset-0 flex items-center justify-center bg-gray-700 bg-opacity-50 ${className}`}>
                <div className={`bg-white w-5/6 p-6 rounded-md`}>
                    <button 
                        onClick={toggleSidebar}
                        className="text-red-500 hover:text-red-700"
                    >
                        <FaTimes size="1.4rem"/>
                    </button>
                    <header>
                        <Logo className="mx-auto w-44 pt-10"/>
                    </header>
                    <div className="p-20">
                        <NavLinks />
                    </div>
                </div>
            </section>
        )
    }
   
    
}