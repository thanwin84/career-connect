import { customFetch } from "./utils";

// user
export const getUserInformationRequest = ()=> customFetch.get('/users/current-user').then(res => res.data)
export const loginRequest = (formData)=> customFetch.post("/auth/login", formData).then(res => res.data.data)
export const registerUserRequest = async(userData)=> {
    await customFetch.post(
        "/auth/register",
        userData,
        {
            headers: {'Content-Type': 'multipart/form-data'}
        }
    )
}
export const logoutUserRequest = async()=> await customFetch.get('/auth/logout')
export const updateUserRequest = async(formData)=> {
    await customFetch.patch(
        "/users/update-user",
        formData,
        {
            headers: {'Content-Type': 'multipart/form-data'}
        }
    )
}
export const uploadPhotoRequest = async(userId, formData)=> {
    await customFetch.patch(
        `/users/${userId}/upload-profile-photo`, 
        formData, 
        {
            headers: {'Content-Type': 'multipart/form-data'}
        })
}
// education
export const addEducationRecordRequest = async(formData)=> await customFetch.patch("/users/add-education", formData)
export const deleteEducationRecordRequest = async(recordId)=> await customFetch.patch(`/users/education/${recordId}`)
export const updateEducationRecordRequest = async(formData, educationRecordId)=> await customFetch.patch(`/users/education/${educationRecordId}/update-record`, formData)
// jobs
export const createJobRequest = async(formData)=> await customFetch.post("/jobs", formData)
export const updateJobRequest = async(paramId, jobData)=>await customFetch.patch(`/jobs/${paramId}`, jobData)
export const getJobRequest = async(jobId)=> await customFetch.get(`/jobs/${jobId}`)
export const getCountryListRequest = ()=> customFetch.get('/records/countries').then(res => res.data.data)
export const getCurrentUserJobsRequest = (params)=> customFetch.get("/jobs", {params:params}).then(res=> res.data)