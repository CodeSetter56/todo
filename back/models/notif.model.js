import mongoose from "mongoose";

const notifSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
    },
    todo:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Todo",
        required:true,
    },
    read:{
        type:Boolean,
        default:false,
    },
    message:{
        type:String,
        required:true,
    }
    
},{timestamps:true})

const Notif = mongoose.model("Notif",notifSchema)
export default Notif