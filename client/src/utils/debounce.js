export default function debounce(cb, delay){
    let timeout
    return ()=>{
        if (timeout) {
            clearTimeout(timeout)
        }
        timeout = setTimeout(()=>{
            cb()
        }, delay)

    }
}