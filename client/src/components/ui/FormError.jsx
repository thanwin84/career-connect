
export default function FormError({message, className}){
    if (message === ""){
        return null
    }
    return (
        <span className={`text-sm text-red-400 dark:text-red-500 ${className}`}>
           {message.substr(0,1).toUpperCase() + message.substr(1)}
        </span>
    )
}