import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { Like } from "../models/like.models.js"

const toggleCommentLike = asyncHandler( async (req, res) => {
    const {commentId} = req.params
    if (!commentId?.trim()) throw new ApiError(401, "No commentID")

    const user = req.user?._id
    if (!user) throw new ApiError(404, "No user found")

    let commentLike = await Like.findOne({
        likedBy: user,
        comment: commentId
    })

    if (commentLike) {
        await Like.findOneAndDelete({
            likedBy: user,
            comment: commentId
        })
        if (!commentLike) throw new ApiError(402, "Could not dislike comment")

        res.status(202).json( new ApiResponse(202, "", "Comment like removed"))
    } else {
        commentLike = await Like.create({
            likedBy: user,
            comment: commentId
        })
        if (!commentLike) throw new ApiError(402, "Could not likecomment")

        res.status(202).json( new ApiResponse(202,commentLike, "Comment liked"))
    }
})

// Toggle tweet like
const toggleTweetLike = asyncHandler( async (req, res) => {
    const {tweetId} = req.params
    if (!tweetId?.trim()) throw new ApiError(401, "No tweetID")

    const user = req.user?._id
    if (!user) throw new ApiError(404, "No user found")

    let tweetLike = await Like.findOne({
        likedBy: user,
        tweet: tweetId
    })

    if (tweetLike) {
        await Like.findOneAndDelete({
            likedBy: user,
            tweet: tweetId
        })
        if (!tweetLike) throw new ApiError(402, "Could not dislike tweet")

        res.status(200).json( new ApiResponse(200, "", "Tweet like removed"))
    } else {
        tweetLike = await Like.create({
            likedBy: user,
            tweet: tweetId
        })
        if (!tweetLike) throw new ApiError(402, "Could not like tweet")

        res.status(200).json( new ApiResponse(200,tweetLike, "Tweet liked"))
    }
})

// Toggle Video Like
const toggleVideoLike = asyncHandler( async (req, res) => {
    const {videoId} = req.params
    if (!videoId?.trim()) throw new ApiError(401, "No videoID")

    const user = req.user?._id
    if (!user) throw new ApiError(404, "No user found")

    let videoLike = await Like.findOne({
        likedBy: user,
        video: videoId
    })

    if (videoLike) {
        await Like.findOneAndDelete({
            likedBy: user,
            video: videoId
        })
        if (!videoLike) throw new ApiError(402, "Could not dislike Video")

        res.status(202).json( new ApiResponse(202, "", "video like removed"))
    } else {
        videoLike = await Like.create({
            likedBy: user,
            video: videoId
        })
        if (!videoLike) throw new ApiError(402, "Could not like Video")

        res.status(202).json( new ApiResponse(202,videoLike, "video liked"))
    }
})

const getLikedVideos = asyncHandler( async (req, res) => {
    const user = req.user
    
    const videos = await Like.find({
        likedBy: user,
        video: {$exists: true}
    })
    
    if (videos?.length) res.status(202).json( new ApiResponse(202, videos, "Liked videos fetched"))
    
    res.status(202).json( new ApiResponse(202, false, "No liked Videos"))
})

export {
    toggleCommentLike,
    toggleTweetLike,
    toggleVideoLike,
    getLikedVideos
}