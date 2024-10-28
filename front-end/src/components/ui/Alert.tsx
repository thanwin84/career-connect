type Props = {
    className?: string
    message: string
}
export default function Alert({message, className}:Props){
    return (
        <small className={`text-red-700 dark:text-red-500 ${className}`}>{message}!</small>
    )
}