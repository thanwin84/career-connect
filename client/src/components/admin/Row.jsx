import {
    ToggleStatus
} from "../admin"
import { formatDate } from "../../utils"

export default function Row({
    accessStatus, 
    name, 
    createdAt,
    role, 
    _id, 
    handleToggle
}){
    return (
        <tr className="border-b last:border-none">
            <td className="p-4">
                <ToggleStatus 
                    accessStatus={accessStatus}
                    handleToggle={handleToggle}
                    _id={_id} 
                />
            </td>
            <td className="p-4">
                {accessStatus ? <span className="text-green-600 dark:text-green-500 border border-green-500 p-1 rounded-lg">Allowed</span>:
                <span className="text-red-600 dark:text-red-500 border border-red-500 p-1 rounded-lg">Not Allowed</span>}
            </td>
            <td className="p-4 text-center dark:text-slate-300">{name}</td>
            <td className="p-4  text-center dark:text-slate-300">{formatDate(createdAt)}</td>
            <td className={`p-4 text-center dark:text-slate-300 ${role === 'admin'? "dark:text-yellow-500 text-yellow-600": ""}`}>{role}</td>
        </tr>
    )
}