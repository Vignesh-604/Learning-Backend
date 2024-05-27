import mongoose from "mongoose";

const orderItems = new mongoose.Schema(
    {
        productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product"
        },
        quantity: {
            type: Number,
            required: true
        }
    }
)

const orderSchema = new mongoose.Schema(
    {
        orderPrice: {
            type: Number,
            required: true,
            default: 0
        },
        costumer: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        orderItems: {
            type: [
                {type: orderItems}      // seperately defining a scheme in the same file
            ]
        },
        address: {
            type: String,
            required: true
        },
        status: {
            type: String,
            enum: ["PENDING", "CANCELLED", "DELIVERED"],
            default: "PENDING"
        }
    }, 
    {timestamps: true}
)

const Order = model('Order', orderSchema);