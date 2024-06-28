import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import {User} from "../models/user.models.js"
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import {ApiResponse} from "../utils/ApiResponse.js"

// Get user data from frontend
// Validation - not empty
// Check if user exists
// Check for images - avatar and cover image
// upload to cloudinary - crosscheck
// create user object in db - create db entry
// remove password and refresh token field
// check for user creation
// return response

const registerUser = asyncHandler( async (req,res) => {

    // Get user details
    const {username, fullname, email, password} = req.body
    // console.log("EMail", email);

    // Validation - checking if each field is not empty or just spaces
    if ([fullname, username, email, password].some((field) => field?.trim() === "")) {
        throw new ApiError(400, "All input fields must be filled")
    }

    // Check for user - find username or password
    const existingUser = await User.findOne({
        $or: [{username}, {email}]
    })

    if (existingUser) throw new ApiError(409, "User with email or username already exists")
    
    // Checking for images in local folder uploaded by multer
    const avatarPath = req.files?.avatar[0]?.path               // need checking for avatar img
    // const coverImagePath = req.files?.coverImage[0]?.path
    
    let coverImagePath
    if (req.files.coverImage && Array.isArray(req.files.coverImage.length > 0)) coverImagePath = req.files?.coverImage[0]?.path

    if (!avatarPath) {
        throw new ApiError(400, "Avatar Image is required")
    }
    console.log(req.files);
    
    // Uploading on Cloudinary and checking for img url
    const avatar = await uploadOnCloudinary(avatarPath)
    const coverImage = await uploadOnCloudinary(coverImagePath)

    if (!avatar) {
        throw new ApiError(404, "Avatar not found!")
    }

    // Creating user in db
    const user = await User.create({
        fullname,
        avatar: avatar.url,
        coverImage: coverImage?.url || "",
        email,
        username: username.toLowerCase(),
        password
    })

    // Removing password and refresh tokens
    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    )
    if (!createdUser) throw new ApiError(500, "Something went wrong while registering the user")

    return res.status(201).json(
        new ApiResponse(200, createdUser, "User Registered successfully!!")
    )
})

export {registerUser}