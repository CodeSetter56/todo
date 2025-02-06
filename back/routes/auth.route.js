import express from "express";
import asyncHandler from "../middlewares/asyncHandler.js";
import { protectRoute } from "../middlewares/protectRoute.js";
import { signup,login,logout,getme } from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/signup", asyncHandler(signup));  
router.post("/login", asyncHandler(login));  
router.post("/logout", asyncHandler(logout));  
router.get("/getme", asyncHandler(protectRoute), asyncHandler(getme));  

export default router;