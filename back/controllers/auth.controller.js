import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import { generateTokenSaveCookie } from "../utils/token.js";

export const signup = async (req, res) => {
    const { username, email, password } = req.body;

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        return res.status(400).json({ error: "Invalid email format" });
    }

    if (await User.findOne({ username })) return res.status(400).json({ error: "Username taken" });
    if (await User.findOne({ email })) return res.status(400).json({ error: "Email taken" });

    if (password.length < 6) {
        return res.status(400).json({ error: "Password should have at least 6 characters" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ email, username, password: hashedPassword });

    if (newUser) {
        await newUser.save();
        generateTokenSaveCookie(newUser._id, res);
        res.status(201).json({
            _id: newUser._id,
            username: newUser.username,
            email: newUser.email,
            pfp: newUser.pfp,
        });
    } else {
        res.status(500).json({ error: "Failed to create user" });
    }
};

export const login = async (req, res) => {
    const { username, password } = req.body;

    // Prevent multiple logins
    const token = req.cookies.jwt;
    if (token) {
        const validToken = jwt.verify(token, process.env.JWT_SECRET);
        if (validToken) {
            return res.status(400).json({ error: "You are already logged in. Please log out first." });
        }
    }

    const user = await User.findOne({ username });
    if (!user) return res.status(400).json({ error: "Invalid username or password" });

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) return res.status(400).json({ error: "Invalid username or password" });

    generateTokenSaveCookie(user._id, res);
    res.status(200).json({
        _id: user._id,
        username: user.username,
        email: user.email,
        pfp: user.pfp,
    });
};

export const logout = async (req, res) => {
    res.cookie("jwt", "", { maxAge: 0, httpOnly: true });
    res.status(200).json({ message: "Logged out successfully" });
};
