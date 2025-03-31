import express from "express";
import asyncHandler from "../middlewares/asyncHandler.js";
import { protectRoute } from "../middlewares/protectRoute.js";
import {getme,update} from "../controllers/user.controller.js";

const router = express.Router();

router.get("/getme", asyncHandler(protectRoute), asyncHandler(getme));  
router.post("/update", asyncHandler(protectRoute), asyncHandler(update));  
// router.post("/darkmode", asyncHandler(protectRoute), asyncHandler(logout));  

export default router;