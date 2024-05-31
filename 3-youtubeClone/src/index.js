import dotenv from "dotenv"
import mongoose from 'mongoose'
import { DB_NAME } from "./constants.js"
import connectDB from "./db/index.js"

dotenv.config({ path: "./env" })

connectDB()

// // DB connection in single file
// import express from 'express'
// const app = express()

// ;(async () => {
//   try {
//     const con = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
//     console.log("Connected to :", con.connection.host);

//     app.on("error", (error) => {
//         console.log("ERROR:", error);
//     })
//     app.listen(process.env.PORT, () => {
//         console.log("Listening on port no.", process.env.PORT);
//     })

//   } catch (error) {
//     console.log(error)
//   }
// })()
