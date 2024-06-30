import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/user.models.js"
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js"

// Steps to register new user:
// Get user data from frontend
// Validation - not empty
// Check if user exists
// Check for images - avatar and cover image
// upload to cloudinary - crosscheck
// create user object in db - create db entry
// remove password and refresh token field
// check for user creation
// return response

const registerUser = asyncHandler(async (req, res) => {

    // Get user details
    const { username, fullname, email, password } = req.body
    // console.log("EMail", email);

    // Validation - checking if each field is not empty or just spaces
    if ([fullname, username, email, password].some((field) => field?.trim() === "")) {
        throw new ApiError(400, "All input fields must be filled")
    }

    // Check for user - find username or password
    const existingUser = await User.findOne({
        $or: [{ username }, { email }]
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
    // console.log(req.files);

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

// Steps to login user:
// Get details
// Username or email login
// Find user in DB
// get password
// access and refresh token
// send cookies

const generateAccessAndRefreshTokens = async (userId) => {
    try {
        const user = await User.findById(userId)

        const accessToken = user.generateAccessToken()
        const refreshToken = user.generateRefreshToken()

        user.refreshToken = refreshToken                // save the refreshToken in user's db
        await user.save({ validateBeforeSave: false })

        return { accessToken, refreshToken }

    } catch (error) {
        throw new ApiError(500, "Something went wrong while generation tokens!")
    }
}

// Login and Logout using Postman vscode extension DOESN'T SEND COOKIES! Use Postman application!!
const loginUser = asyncHandler(async (req, res) => {

    // Fetch details and check for req fields
    const { username, email, password } = req.body
    if (!username && !email) throw new ApiError(400, "Username or Email is required!!")

    // Check in db for username or email
    // MongoDB predefined methods can be accessed directly from schema
    const user = await User.findOne({
        $or: [{ username }, { email }]
    })
    if (!user) throw new ApiError(401, "User not found!!")

    // Password checking
    // Custom made methods can only be accessed from db fetched user details
    const validPassword = await user.isPasswordCorrect(password)
    if (!user) throw new ApiError(402, "Password incorrect!!")

    // Refresh and access tokens
    const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(user._id)

    // Optional step: fetching details without passsword and tokens
    const loggedInUser = await User.findById(user._id).select("-password -refreshToken")

    // Cookies cannot be accessed by client-side scriptsand are sent by HTTPS only 
    const options = { httpOnly: true, secure: true }

    return res.status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json(
            new ApiResponse(
                200,
                {
                    user: loggedInUser, accessToken, refreshToken
                },
                "User logged in successfully!!"
            )
        )

})

const logoutUser = asyncHandler(async (req, res) => {
    await User.findByIdAndUpdate(
        req.user._id,
        { $set: { refreshToken: undefined } },    //Clears refresh token for the logged-in user in the db.
        { new: true }
    )

    const options = { httpOnly: true, secure: true }

    return res.status(200)
        .clearCookie("accessToken")     // clears tokens from cookies
        .clearCookie("refreshToken")
        .json(new ApiResponse(200, {}, "User logged out successfully!!"))
})

export { registerUser, loginUser, logoutUser }