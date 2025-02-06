import express from "express";
import asyncHandler from "../middlewares/asyncHandler.js";
import { protectRoute } from "../middlewares/protectRoute.js";
import {profile,update} from "../controllers/user.controller.js";

const router = express.Router();

router.get("/profile", asyncHandler(protectRoute), asyncHandler(profile));  
router.post("/update", asyncHandler(protectRoute), asyncHandler(update));  
// router.post("/darkmode", asyncHandler(protectRoute), asyncHandler(logout));  

export default router;