import express from "express";
import asyncHandler from "../middlewares/asyncHandler.js";
import { protectRoute } from "../middlewares/protectRoute.js";
import { get, deleteNotif, unread } from "../controllers/notif.controller.js";

const router = express.Router();

router.get("/", asyncHandler(protectRoute), asyncHandler(get));  
router.get("/unread", asyncHandler(protectRoute), asyncHandler(unread));  
router.delete("/", asyncHandler(protectRoute), asyncHandler(deleteNotif));  

export default router;