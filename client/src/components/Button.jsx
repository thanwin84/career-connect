import React from "react";
import Spinner from "./Spinner";
export default function Button({
    type="button",
    classname,
    category="primary",
    children,
    loading=false,
    loadingText,
    ...props
}){
    const styles = {
        primary: "bg-blue-500 hover:bg-blue-600 text-white",
        danger: "bg-red-500 hover:bg-red-600 text-white",
        success: "bg-green-500 hover:bg-green-600 text-white",
        link: "bg-white text-blue-600 hover:underline",
        normal: "bg-gray-500 text-gray-100 hover:bg-gray-600"
      }
    const loadingStyle = "bg-gray-400  cursor-not-allowed"
    return (
        <button
            {...props}
            disabled={loading}
            className={` ${classname} px-4 py-2 rounded-md ${loading ? loadingStyle: styles[category]} `}
        >
            {loading ? (
                <div className="flex gap-2 justify-center">
                    <Spinner 
                        size="w-4 h-4" 
                        borderThickness="border-2" 
                        color='border-slate-100' 
                    />
                    {loading && <span className="text-slate-200">{loadingText}</span>}
                </div>
            ): (children)}
        </button>
    )
}