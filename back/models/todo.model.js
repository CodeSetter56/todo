import mongoose from "mongoose";

const todoSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
    },
    priority:{
        type:String,
        required:true,
        enum:["high","normal"]
    },
    status:{
        type:String,
        required:true,
        enum:["pending","completed"]
    },
    text:{
        type:String,
        required:true,
    },
    title:{
        type:String,
        unique:true,
        required:true,
    },
    img:{
        type:String,
    }
},{timestamps:true})

const Todo = mongoose.model("Todo",todoSchema)
export default Todo