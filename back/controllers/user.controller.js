import { v2 as cloudinary } from "cloudinary";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

import User from "../models/user.model.js";

export const getme = async (req, res) => {
    const token = req.cookies.jwt;

    if (!token) return res.status(401).json({ error: "Not authenticated" });
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded.userId) {
        return res.status(401).json({ error: "Token does not contain valid userId" });
    }

    const user = await User.findById(decoded.userId).select("-password");
    if (!user) return res.status(404).json({ error: "User not found" });

    res.status(200).json(user);
};

export const update = async(req,res)=>{
    const {newusername,newemail,currpass,newpass} = req.body
    let {pfp} = req.body
    const user = await User.findById(req.user._id)
    
    if(!user) return res.status(400).json({ error: "User not found" });
    if(newusername){
        if(await User.findOne({username:newusername})) return res.status(400).json({ error: "Username already taken" });
        user.username = newusername
    }
    if(newemail){
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(newemail)) return res.status(400).json({ error: "Invalid email format" });
        if(await User.findOne({email:newemail})) return res.status(400).json({ error: "Email exists" });
        user.email = newemail
    }
    if(currpass||newpass){
        if(!currpass||!newpass) return res.status(400).json({ error: "Please provide both current and new passwords" })
        const isMatch = await bcrypt.compare(currpass,user.password)
        if(!isMatch)return res.status(400).json({ error: "Incorrect password" })
        if(newpass.length<6) return res.status(400).json({ error: "Password should have at least 6 characters" })
        user.password = await bcrypt.hash(newpass, 10)
    }
    if (pfp) {
        if (user.pfp) await cloudinary.uploader.destroy(user.pfp.split("/").pop().split(".")[0]);
        const uploadRes = await cloudinary.uploader.upload(pfp);
        user.pfp = uploadRes.secure_url;
    }
    await user.save();
    user.password=null
    return res.status(200).json(user);
}

export const darkmode = async (req, res) => {
  const { darkmode } = req.body;

  const user = await User.findById(req.user._id);
  if (!user) return res.status(404).json({ error: "User not found" });

  user.darkmode = darkmode;
  await user.save();

  res.status(200).json({ success: true });
};