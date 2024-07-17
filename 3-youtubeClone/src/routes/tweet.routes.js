import { Router } from "express"
import { createTweet, updateTweet, deleteTweet, getUserTweets } from "../controllers/tweet.controller.js"
import { verifyJWT } from "../middlewares/auth.middleware.js"

const router = Router()

router.use(verifyJWT)       // Apply JWT middleware to all routes to this file

router.route("/new").post(createTweet)

router.route("/:tweetId").post(updateTweet).delete(deleteTweet)

router.route("/user/:userId").post(getUserTweets)

export default router