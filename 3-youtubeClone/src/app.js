import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"

const app = express()

app.use(cors({                              // express uses .use for using middlewares
    origin: process.env.CORS_ORIGIN,        // allow requests from the specified origin
    credentials: true                       // cookies to be included in cross-origin requests.
}))

// To handle data
app.use(express.json({limit: "16kb"}))      // To accept json data of certain limit

app.use(express.urlencoded({extended: true, limit: "16kb"}))    // Accept data from url

app.use(express.static("public"))           // To store static files like images,etc param:folder_name

app.use(cookieParser())                     // To set and edit cookies


// Routes
import userRouter from "./routes/user.routes.js"
import tweetRouter from "./routes/tweet.routes.js"

app.use("/users", userRouter)               // All urls followed by /users is defined in user routes
app.use("/tweet", tweetRouter)
// Prefix url ex. localhost/api/v1/users/register

export {app}