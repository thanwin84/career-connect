import axios from "axios";

const customFetch = await axios.create({
    baseURL: "/api/v1"
})

export default customFetch