import {Router} from "express"
import { loginUser, logoutUser, registerUser } from "../controllers/user.controller.js"
import {upload} from "../middlewares/multer.middleware.js"
import { verifyJWT } from "../middlewares/auth.middleware.js"

const router = Router()         // Sets up an express router

// It defines a POST route at /register which calls the registerUser controller function.
// Test by sending an API req to http://localhost:8000/users/register using Postman or thunder client
router.route("/register").post(
    upload.fields([                         // Multiple files upload with specific names and count                   
        {name: "avatar", maxCount: 1},
        {name: "coverImage", maxCount: 1}
    ]),
    registerUser
)

router.route("/login").post(loginUser)

// secured routes
router.route("/logout").post(verifyJWT, logoutUser)

export default router