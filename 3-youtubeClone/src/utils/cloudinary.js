import {v2 as cloudinary} from "cloudinary"
import fs from "fs"

cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET 
});

const uploadOnCloudinary = async (localFilepath) => {
    try {
        if (!localFilepath) return null

        // Upload File on cloudinary
        const response = await cloudinary.uploader.upload(localFilepath, {resource_type:"auto"})

        console.log("File uploaded!! URL: ", response.url);
        fs.unlinkSync(localFilepath)                //delete the locally saved temp file

        return response

    } catch (error) {
        fs.unlinkSync(localFilepath)                //delete the locally saved temp file
        return null
    }
}

export {uploadOnCloudinary}