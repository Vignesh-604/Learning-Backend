import {Router} from "express"
import { registerUser } from "../controllers/user.controller.js"

const router = Router()         // Sets up an express router

// It defines a POST route at /register which calls the registerUser controller function.
// Test by sending an API req to http://localhost:8000/users/register using Postman or thunder client
router.route("/register").post(registerUser)

export default router