import express from "express";
import asyncHandler from "../middlewares/asyncHandler.js";
import { protectRoute } from "../middlewares/protectRoute.js";
import {getTodo,create,edit,deleteTodo} from "../controllers/todo.controller.js";

const router = express.Router();

router.get("/all/:status", asyncHandler(protectRoute), asyncHandler(getTodo));  
router.post("/create", asyncHandler(protectRoute), asyncHandler(create));  
router.post("/edit/:id", asyncHandler(protectRoute), asyncHandler(edit));  
router.delete("/:id", asyncHandler(protectRoute), asyncHandler(deleteTodo));  

export default router;