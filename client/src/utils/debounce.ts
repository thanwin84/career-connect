export default function debounce(cb: ()=>void, delay:number){
    let timeout:ReturnType<typeof setTimeout>
    return ()=>{
        if (timeout) {
            clearTimeout(timeout)
        }
        timeout = setTimeout(()=>{
            cb()
        }, delay)

    }
}