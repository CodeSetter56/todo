import jwt from "jsonwebtoken"

export const genarateTokenSaveCookie = (userid,res) =>{
    const token = jwt.sign({userid},process.env.JWT_SECRET,{expiresIn:'1d'}) //used by protectRoute
    res.cookie("jwt",token,{
        httpOnly:true,
        sameSite:"strict",
        secure:process.env.NODE_ENV !== "development" 
    })
}