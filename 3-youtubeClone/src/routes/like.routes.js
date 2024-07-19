import { Router } from "express"
import { verifyJWT } from "../middlewares/auth.middleware.js"
import {
    toggleCommentLike,
    toggleVideoLike,
    toggleTweetLike,
    getLikedVideos
} from "../controllers/like.controller.js"

const router = Router()

router.use(verifyJWT)

router.route("/c/:commentId").post(toggleCommentLike)

router.route("/t/:tweetId").post(toggleTweetLike)

router.route("/v/:videoId").post(toggleVideoLike)

router.route("/likedVideos").get(getLikedVideos)

export default router
