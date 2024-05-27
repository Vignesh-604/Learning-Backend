import mongoose from "mongoose"

const patientSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        diagnosedWith: {
            type: String,
            required: true
        },
        address: {
            type: String,
            required: true
        },
        age: {
            type: Number,
            required: true
        },
        bloodGroup: {
            type: String,
            required: true
        },
        gender: {
            type: String,
            enum: ["M", "F", "O"],
            required: true
        },
        admittedIn: [
            {
                name: {
                    type : mongoose.Schema.Types.ObjectId,
                    ref: "Hospital"
                },
                hours: {
                    type: Number,
                    default: 0
                }
            }
        ]
    }, {timestamps: true}
)

const Patient = model('Patient', patientSchema);