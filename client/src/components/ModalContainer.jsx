import React from "react";


export default function ModalContainer({children, className}){
    return (
        <section className={`fixed inset-0 flex items-center justify-center bg-gray-700 bg-opacity-50 ${className}`}>
                {children}
        </section>
    )
}