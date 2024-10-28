import formatDate from "./formatDate";
import customFetch from "./customFetch";
import debounce from "./debounce";

function storeInLocalStorage(key, ob){
    try {
        const value = localStorage.getItem(key)
        if (!value){
            localStorage.setItem(key, JSON.stringify(ob))
            return ob
        }
        return JSON.parse(value)
    } catch (error) {
        console.log("error accessing localstorage")
        return null
    }
}

export {
    formatDate,
    customFetch,
    debounce,
    storeInLocalStorage
}