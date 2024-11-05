import  {ReactNode, useEffect} from "react";

type Props = {
    children: ReactNode
    className?: string
    modelClassName?: string
    titleId?: string
    descriptionId?: string
    
}

export default function ModalContainer({
    children, 
    className, 
    modelClassName,
    titleId = "modal title id",
    descriptionId="modal description id"
}:Props){
    useEffect(() => {
        // Add the overflow-hidden class to the body when the modal is mounted
        document.body.classList.add("overflow-hidden");

        // Remove the overflow-hidden class from the body when the modal is unmounted
        return () => {
            document.body.classList.remove("overflow-hidden");
        };
    }, []);
    return (
        <div 
            aria-labelledby={titleId}
            aria-describedby={descriptionId}
            role="dialog" 
            className={`fixed inset-0 flex items-center justify-center bg-gray-700 bg-opacity-50 ${modelClassName}`}
        >
                <div className="w-full max-h-screen  overflow-y-auto">
                    <div className={`mx-auto ${className}`}>
                        {children}
                    </div>
                </div>
        </div>
    )
}