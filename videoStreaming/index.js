import express from "express"
import multer from "multer"
import cors from "cors"
import { v4 as uuidv4 } from "uuid"
import path from "path"
import fs from "fs"
import { exec } from "child_process"    // dangerous

const app = express()

app.use(cors({
    origin: ["http://localhost:3000", "http://localhost:5173"],
    credentials: true
}))

// app.use((req, res, next) => {
//     res.header("Access-Control-Allow-Origin", "*"),  // all accepted
//         res.header(
//             "Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept"
//         )
//     next()
// })

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use("/uploads", express.static("uploads"))

// multer middleware
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./uploads")
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + "-" + uuidv4() + path.extname(file.originalname))
    }
})

const upload = multer({storage})

app.post("/upload", upload.single("file"), (req, res) => {
    console.log("File uploaded");

    const videoId = uuidv4()                               // Generates a unique ID for the video
    const videoPath = req.file?.path                        // Path of uploaded file
    const outputPath = `./uploads/hlsFormats/${videoId}`      // new directory path where the HLS (HTTP Live Streaming) segments and playlist will be stored, using the generated videoId

    const hlsPath = `${outputPath}/index.m3u8`              // The path to the HLS playlist file (index.m3u8).
    console.log(hlsPath);

    if (!fs.existsSync(outputPath)) {                       //  if the outputPath directory exists.
        fs.mkdirSync(outputPath, {recursive: true})         // creates the directory and any necessary parent directories (recursive: true).
    }

    const ffmpegCommand = `ffmpeg -i ${videoPath} -codec:v libx264 -codec:a aac -hls_time 10 -hls_playlist_type vod -hls_segment_filename "${outputPath}/segment%03d.ts" -start_number 0 ${hlsPath}`;

    // no queue because of POC, not to run in prod
    // Using Node.js child_process module's exec function to run the FFmpeg command.
    exec(ffmpegCommand, (error, stdout, stderr) => {
        if (error) console.log("Exec error:", error);

        // Logs the standard output (stdout) and standard error (stderr) of the FFmpeg command to the console for debugging.
        console.log("Stdout: ", stdout);
        console.log("Stderr: ", stderr);

        // Path where HLS playlist can be accessed
        const videoUrl = `http://localhost:8000/uploads/hlsFormats/${videoId}/index.m3u8`

        if (videoPath) fs.unlinkSync(videoPath)    // removes locally saved video

        res.json({
            message: "Video converted to hls format",
            videoUrl,
            videoId,
        })
    })

})

app.get("/", (req, res) => {
    res.json({ message: "Hello" })
})

app.listen(8000, () => {
    console.log("App is running at port 8000");
})