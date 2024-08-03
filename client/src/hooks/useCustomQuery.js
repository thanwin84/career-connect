import {useState, useEffect} from 'react'
import axios from 'axios'

export default function useCustomQuery(path){
    const [data, setData] = useState(null)
    const [error, setError] = useState(false)
    const [loading, setLoading] = useState(false)
    

    useEffect(()=>{
        const getData = async(path)=>{
            try {
                setError(false)
                setLoading(true)
                const {data} = await axios.create({baseURL: "/api/v1"}).get(path)
                setData(data)
            } catch (error) {
                setError(true)
            }finally{
                setLoading(false)
            }
        }
        getData(path)
    }, [path])
    
   
    return [data, loading, error]
}