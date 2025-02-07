import express from "express";
import asyncHandler from "../middlewares/asyncHandler.js";
import { protectRoute } from "../middlewares/protectRoute.js";
import {} from "../controllers/notif.controller.js";

const router = express.Router();

router.get("/get", asyncHandler(protectRoute), asyncHandler(profile));  
router.delete("/delete", asyncHandler(protectRoute), asyncHandler(update));  

export default router;