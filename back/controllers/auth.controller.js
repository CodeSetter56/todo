import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import User from "../models/user.model.js";
import { genarateTokenSaveCookie } from "../utils/token.js";

export const signup = async(req,res) =>{
    const {username,email,password} = req.body
    
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return res.status(400).json({ error: "Invalid email format" });
    if(await User.findOne({username})) return res.status(400).json({ error: "Username taken" });    
    if(await User.findOne({email})) return res.status(400).json({ error: "Email taken" });    
    if(password.length<6) return res.status(400).json({ error: "Password should have at least 6 characters" });
    
    const hashpw = await bcrypt.hash(password, 10)
    const newUser = new User({email,username,password:hashpw})
    
    if(newUser){
        genarateTokenSaveCookie(newUser._id,res)
        await newUser.save()
        res.status(200).json({
        _id : newUser._id,
        username : newUser.username,
        email : newUser.email,
        pfp: newUser.pfp,
    })
}
}

export const login = async(req,res) =>{
    const {username,password} = req.body

    const token = req.cookies.jwt
    if(token){
        const correcttoken = jwt.verify(token,process.env.JWT_SECRET)
        if(correcttoken)return res.status(400).json({ error: "You are already logged in. Please log out first." });
    }
    
    const user = await User.findOne({username})
    const correctpw = await bcrypt.compare(password,user?.password)
    
    if(!user || !correctpw) return res.status(400).json({ error: "invalid username or password" });   
    
    genarateTokenSaveCookie(user._id,res)
    res.status(200).json({
        _id : user._id,
        username : user.username,
        email : user.email,
        pfp: user.pfp,
    })
}

export const logout = async(req,res) =>{
    res.cookie("jwt","",{maxAge:0})
    return res.status(200).json({ message: "logged out successfully" });
}

export const getme = async(req,res)=>{
    const user = await User.findById(req.user._id).select("-password")
    res.status(200).json(user)
}