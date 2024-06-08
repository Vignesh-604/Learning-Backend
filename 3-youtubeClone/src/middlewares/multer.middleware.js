import multer from "multer"

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/temp')                   // upload file to emp folder
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)                 // keep og filename
    }
})

const upload = multer({ storage })