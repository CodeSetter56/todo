import express from "express";
import asyncHandler from "../middlewares/asyncHandler.js";
import { protectRoute } from "../middlewares/protectRoute.js";
import {getme,update,darkmode} from "../controllers/user.controller.js";

const router = express.Router();

router.get("/getme", asyncHandler(protectRoute), asyncHandler(getme));  
router.post("/update", asyncHandler(protectRoute), asyncHandler(update));  
router.post("/darkmode", asyncHandler(protectRoute), asyncHandler(darkmode));  

export default router;