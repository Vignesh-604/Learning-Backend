import mongoose, { Schema } from "mongoose"

const doctorSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        salary: {
            type: Number,
            required: true
        },
        qualification: {
            type: String,
            required: true
        },
        experience: {
            type: Numbers,
            default: 0
        },
        worksInHospitals : {
            type : mongoose.Schema.Types.ObjectId
        }
    }
)

const Doctor = model('Doctor', doctorSchema);