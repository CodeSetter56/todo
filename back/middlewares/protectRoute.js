import jwt from "jsonwebtoken"
import User from "../models/user.model.js";

export const protectRoute = async(req,res,next)=>{
    const token = req.cookies.jwt
    if(!token) return res.status(400).json({error: "must login first"})

    const correcttoken = jwt.verify(token,process.env.JWT_SECRET)
    if(!correcttoken)return res.status(400).json({ error: "invalid token"});

    const user = await User.findById(correcttoken.userid).select("-password") //userid from utils/token.js
    req.user = user
    next()
}