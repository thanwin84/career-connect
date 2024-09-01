import { customFetch } from "./utils";

// user
export const getUserInformation = ()=> customFetch.get('/users/current-user').then(res => res.data)
export const login = (formData)=> customFetch.post("/auth/login", formData).then(res => res.data.data)
export const registerUser = (userData)=> customFetch.post("/auth/register", userData).then(res => res.data)
export const logoutUser = async()=> await customFetch.get('/auth/logout')
export const updateUser = async(formData)=> await customFetch.patch("/users/update-user", formData)
// education
export const addEducationRecord = async(formData)=> await customFetch.patch("/users/add-education", formData)
export const deleteEducationRecord = async(recordId)=> await customFetch.patch(`/users/education/${recordId}`)
export const updateEducationRecord = async(formData, educationRecordId)=> await customFetch.patch(`/users/education/${educationRecordId}/update-record`, formData)
// jobs
export const createJob = async(formData)=> await customFetch.post("/jobs", formData)
export const updateJob = async(paramId, jobData)=>await customFetch.patch(`/jobs/${paramId}`, jobData)
export const getJob = async(jobId)=> await customFetch.get(`/jobs/${jobId}`)
export const getCountryList = ()=> customFetch.get('/records/countries').then(res => res.data.data)
export const getCurrentUserJobs = (params)=> customFetch.get("/jobs", {params:params}).then(res=> res.data)
export const uploadPhoto = async(userId, formData)=> {
    await customFetch.patch(
        `/users/${userId}/upload-profile-photo`, 
        formData, 
        {
            headers: {'Content-Type': 'multipart/form-data'}
        })
}