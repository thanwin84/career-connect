import React from "react";
import { Logo } from "../components";
import main from "../assets/images/main.svg"
import { Link } from "react-router-dom";

export default function Landing(){
    return (
        <section className="h-screen bg-stone-100 dark:bg-zinc-900 w-full flex flex-col">
            <nav className="px-6 pt-10 w-5/6">
                <Logo className="w-72" />
            </nav>
            <div className="my-20 flex w-full lg:w-5/6">
                <div className=" px-6">
                    <h1 
                        className="text-5xl lg:text-6xl mb-8 dark:text-white"
                    >
                        Job <span className="text-sky-600">Tracking</span> App
                    </h1>
                    <p className="leading-8 dark:text-slate-300">
                    Welcome to CareerConnect – your path to endless opportunities. Whether you're a seasoned professional or a fresh graduate, find your dream job effortlessly. Explore tailored listings, connect with recruiters, and take the next step in your career journey. Join us today and unlock your potential!
                    </p>

                    <div className="mt-6">
                        <Link
                            className="px-8 py-2 bg-blue-500 hover:bg-blue-700 text-white rounded-sm mr-4"
                            to="/register"
                        >
                         Register
                        </Link>
                        <Link 
                            className="px-8 py-2 bg-blue-500 hover:bg-blue-700 text-white rounded-sm"    
                            to="/login"
                        >
                         Login
                        </Link>
                    </div>
                   
                </div>
                <img src={main} className="h-80 w-80 hidden lg:block" alt="" />
            </div>
        </section>
    )
}