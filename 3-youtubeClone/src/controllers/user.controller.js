import { asyncHandler } from "../utils/asyncHandler.js";

const registerUser = asyncHandler( async (req,res) => {
    // Send the HTTP status code and JSON response
    res.status(200).json({
        message: "ok"
    })
})

export {registerUser}