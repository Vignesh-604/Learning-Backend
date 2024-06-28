import {Router} from "express"
import { registerUser } from "../controllers/user.controller.js"
import {upload} from "../middlewares/multer.middleware.js"

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

export default router