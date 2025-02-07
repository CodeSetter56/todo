import User from "../models/user.model.js";
import Notif from "../models/notif.model.js";

export const get = async(req,res)=>{
    const notif = await Notif.find({user:req.user._id}).sort({createdAt:-1})
    await Notif.updateMany({ user: req.user._id }, { read: true });
    res.status(200).json(notif)
} 

export const unread = async (req, res) => {
    const count = await Notif.countDocuments({ user: req.user._id, read: false });
    res.status(200).json({ unreadCount: count });
};

export const deleteNotif = async (req, res) => {
    await Notif.deleteMany({ user: req.user._id });
    res.status(200).json({ message: "All notifications deleted" });
};