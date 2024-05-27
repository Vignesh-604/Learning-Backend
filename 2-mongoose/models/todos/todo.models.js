import mongoose from "mongoose";

const todoSchema = new mongoose.Schema(
    {
        content: {
            type: String,
            required: true
        },
        complete: {
            type: Boolean,
            default: false
        },
        createdBy: {
            type: mongoose.Schema.Types.ObjectId,           // Reference of other model
            ref: "User"                                     // Name of model
        },
        subTodos: [                                         // multiple sub-todos
            {                                               // each sub-todo having SubTodo schema
                type: mongoose.Schema.Types.ObjectId,
                ref : "SubTodo"
            }
        ]
    },
    {timestamps: true}
)

export const Todo = mongoose.model("Todo", todoSchema)