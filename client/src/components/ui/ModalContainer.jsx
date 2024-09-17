import  {useEffect} from "react";


export default function ModalContainer({children, className, modelClassName}){
    useEffect(() => {
        // Add the overflow-hidden class to the body when the modal is mounted
        document.body.classList.add("overflow-hidden");

        // Remove the overflow-hidden class from the body when the modal is unmounted
        return () => {
            document.body.classList.remove("overflow-hidden");
        };
    }, []);
    return (
        <section className={`fixed inset-0 flex items-center justify-center bg-gray-700 bg-opacity-50 ${modelClassName}`}>
                <div className="w-full max-h-screen  overflow-y-auto">
                    <div className={`mx-auto ${className}`}>
                        {children}
                    </div>
                </div>
        </section>
    )
}