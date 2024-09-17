import  { useEffect, useState } from "react";
import { customFetch } from "../../utils"
import { Pagination } from "../ui";
import UsersTable from "../admin/UsersTable";

export default function UsersContainer({className}){
    const [users, setUsers] = useState([])
    const [totalPages, setTotalPages] = useState(0)
    const [currentPage, setCurrentPage] = useState(1)
   

    function handlePageChange(pageNumber){
        setCurrentPage(pageNumber)
    }
    function handleToggle(userId){
        setUsers(prevList => {
            return prevList.map(user => (
                user._id === userId ? {...user, accessStatus: !user.accessStatus}: user
            ))
        })
        
    }
    
    useEffect(()=>{
        const fetchData = async()=>{
            try {
                const {data} = await customFetch.get(`/users/get-users-list?page=${currentPage}`)
                setUsers(data.users)
                setTotalPages(data.totalPages)
            } catch (error) {
                
            }
        }
        fetchData()
    }, [currentPage])

    return (
        <div className={`w-full ${className}`}>
            <h2 className="mb-4 text-center text-xl text-slate-700 dark:text-slate-200 font-bold">Manage Users</h2>
            <UsersTable 
                handleToggle={handleToggle} 
                users={users} 
            />
            {totalPages > 1 && (
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    handlePageChange={handlePageChange}
                    className="justify-end"
                />
            )}
        </div>
    )
}