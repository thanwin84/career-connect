
import { useAllJobsContext } from "../../pages/AllJobs";
import { useLocation, useNavigate } from "react-router-dom";
import {Pagination} from "../ui"


export default function AllJobsPaginationContainer(){
    let {data} = useAllJobsContext()
    const totalPages = Number(data.totalPages)
    const currentPage = Number(data.currentPage)
    const {pathname, search} = useLocation()
    const navigate = useNavigate()

    function handlePageChange(pageNumber:number){
        const query = new URLSearchParams(search)
        query.set('page', pageNumber.toString())
        const url = `${pathname}?${query}`
        navigate(url)
    }
    
    
    return (
        <div>
            {totalPages > 1 && (
                <Pagination 
                    totalPages={totalPages} 
                    currentPage={currentPage}
                    handlePageChange={handlePageChange}
                    className= "justify-end"
                />
            )}
        </div>
    )
}