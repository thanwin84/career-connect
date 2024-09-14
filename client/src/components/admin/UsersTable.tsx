import React from "react";
import Row from "./Row";

export default function UsersTable({handleToggle, users}){
    const headers = ["Ban", "Access Status", "User's Name", "Joined Date", "Role"]
    return (
        <table className="table-auto w-full bg-white dark:bg-zinc-900 shadow-md rounded-md">
            <thead>
                <tr>
                    {headers.map((item,index)=>(
                        <th  key={index} className="p-4  text-slate-700 dark:text-slate-200">
                            {item}
                        </th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {users?.map(user=>(
                    <Row key={user._id} {...user} handleToggle={handleToggle} />
                ))}
            </tbody>
        </table>
    )
}