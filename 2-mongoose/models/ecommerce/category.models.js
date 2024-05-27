import mongoose, { mongo } from "mongoose";

const categorySchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        }
    },
    {timestamps: true}
)

export const Category = mongoose.model("Category", categorySchema)

// it'll be converted to categories in mongodb