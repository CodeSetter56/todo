import jwt from "jsonwebtoken";

export const generateTokenSaveCookie = (userId, res) => {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: "12h" });

    res.cookie("jwt", token, {
        httpOnly: true,
        sameSite: "strict",
        secure: process.env.NODE_ENV === "production", 
        maxAge: 12 * 60 * 60 * 1000, 
    });
};
