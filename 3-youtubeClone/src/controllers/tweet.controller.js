import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { Tweet } from "../models/tweet.models.js"

// Get content from frontend and userID from req.user
// Create tweetobject in db
const createTweet = asyncHandler(async (req, res) => {
    const { content } = req.body
    if (!content.trim()) throw new ApiError(402, "Enter your tweet content")

    const owner = req.user?._id
    if (!owner) throw new ApiError(404, "No owner found")

    const tweet = await Tweet.create({
        content, owner
    })

    res.status(200).json(new ApiResponse(200, tweet, "Tweeted successfully"))
})

// Get tweet based on tweetID
// Find by id and update
const updateTweet = asyncHandler(async (req, res) => {
    const { tweetId } = req.params
    if (!tweetId) throw new ApiError(402, "No tweet id found")

    const { content } = req.body
    if (!content.trim()) throw new ApiError(402, "Enter your tweet content")

    const tweet = await Tweet.findByIdAndUpdate(
        tweetId,
        { $set: { content } },
        { new: true}
    )

    res.status(201).json( new ApiResponse(201, tweet, "Tweet updated successfully!"))
})

// Get tweet id and delete
const deleteTweet = asyncHandler(async (req, res) => {
    const { tweetId } = req.params
    if (!tweetId) throw new ApiError(402, "No tweet id found")

    await Tweet.findByIdAndDelete("6697926628ea7ca31cb73734")

    res.status(201).json( new ApiResponse(201, "", "Tweet updated successfully!"))
})

// Get userId from params
const getUserTweets = asyncHandler(async (req, res) => {

    const {userId} = req.params
    if (!userId.trim()) throw new ApiError(403, "No userId")

    const tweets = await Tweet.find({ owner: userId }).select("content")
    if (!tweets) throw new ApiError(404, "No tweets found")

    res.status(203).json(new ApiResponse(200, tweets, "Tweets fetched successfully"))
})

export {
    createTweet,
    updateTweet,
    deleteTweet,
    getUserTweets,
}