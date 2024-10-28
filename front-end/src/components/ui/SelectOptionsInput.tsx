
type Props<T> = {
    options: string[]
    selectedOption: string
    onSelect: (value: T)=> void
    className?: string
    name: string

}
export default function SelectOptionsInput<T>({
    options, 
    selectedOption, 
    onSelect,
    className,
    name
}:Props<T>){

    return (
        <>
        <ul className={`w-full flex gap-2 ${className}`}>
            {options.map(option => (
                <li key={option}>
                <input 
                    id={option}
                    type="checkbox" 
                    value={option}
                    checked={options.includes(option)}
                    className="hidden"
                    onChange={()=>onSelect(option as T)}
                    name={name}
                />
                <label
                    className={`px-4 py-2 bg-blue-100 rounded-md text-sm cursor-pointer ${selectedOption.toLowerCase() === option.toLowerCase() ? "bg-blue-600 text-slate-100": ""}`}
                    htmlFor={option}
                >
                    {option.toUpperCase()}
                </label>
                </li>
            ))}
        </ul>
        
        </>
    )
}