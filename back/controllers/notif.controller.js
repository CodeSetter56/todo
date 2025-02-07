import User from "../models/user.model.js";
import Notif from "../models/notif.model.js";

export const get = async(req,res)=>{
    const notif = await Notif.find({user:req.user._id}).sort({createdAt:-1}).
    populate("todo","title status priority")
    res.status(200).json(notif)
} 