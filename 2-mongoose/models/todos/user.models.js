import mongoose, { mongo } from "mongoose";

const userSchema = new mongoose.Schema(
    {
        username : {                        // can just write String
            type: String,                   // passing obj helps validate more 
            required: true,
            unique: true,
            lowercase: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true
        },
        password: {
            type: String,
            required: [true, "Password required!!"]
        }
    },
    {
        timestamps: true      //  fiels createdAt and updatedAt
    }
)

export const User = mongoose.model("User", userSchema)      // to use the scheme in multiple files
// When the model is connected with monog db, the name will be converted to plural and lower case
// User --> users