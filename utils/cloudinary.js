import {v2 as cloudinary} from 'cloudinary'
import fs from 'fs'
import * as dotenv from 'dotenv'
dotenv.config()


cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET 
});



const uploadOnCloudinary = async (localFilePath) => {
    
    
  try {
    if (!localFilePath) return null
    // upload file on cloudinary
    const response = await cloudinary.uploader.upload(
      localFilePath,
      {
        resource_type: "auto"
      }
    )
    // file has been uploaded successfully
    fs.unlinkSync(localFilePath)
    return response
  } catch (error) {
    // remove the locally saved temporary file as the upload operation has failed
    fs.unlinkSync(localFilePath)
    return null
  }
}
const deleteAsset = async(publicId)=>{
  try {
    const response = await cloudinary.uploader.destroy(publicId)
    return response
  } catch (error) {
    
    return null
  }
}


export {
  uploadOnCloudinary,
  deleteAsset
}