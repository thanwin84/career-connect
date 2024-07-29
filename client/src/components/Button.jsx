import React from "react";

export default function Button({
    type="button",
    classname,
    category="primary",
    children,
    ...props
}){
    const styles = {
        primary: "bg-blue-500 hover:bg-blue-600 text-white",
        danger: "bg-red-500 hover:bg-red-600 text-white",
        success: "bg-green-500 hover:bg-green-600 text-white",
        link: "bg-white text-blue-600 hover:underline",
        normal: "bg-gray-500 text-gray-100 hover:bg-gray-600"
      }
    return (
        <button
            {...props}
            className={`w-full px-4 py-2 rounded-md ${styles[category]} ${classname}`}
        >
            {children}
        </button>
    )
}