import mongoose, { mongo } from "mongoose";

const productSchema = new mongoose.Schema(
    {
        description: {
            type: String,
            required: true
        },
        username: {
            type: String,
            required: true,
        },
        productImage: {
            type: String,       //images are stored on 3rd party servers and a public url is given
        },
        price: {
            type: Number,
            default: 0
        },
        stock: {
            type: Number,
            default: 0
        },
        category: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Category",
            required: true
        },
        owner: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
    },
    {
        timestamps: true,
    }
);

export const Product = model('Product', productSchema);