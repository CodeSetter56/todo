import express from "express";
import dotenv from 'dotenv'
import cors from "cors";
import cookieParser from "cookie-parser";
import { v2 } from "cloudinary";

import { dbconnect } from "./db/db.js";

import authRoutes from "./routes/auth.route.js"
import userRoutes from "./routes/user.route.js"
import todoRoutes from "./routes/todo.route.js"
import notifRoutes from "./routes/notif.route.js"
 
dotenv.config()
const app = express()

app.use(cors({
    origin: "http://localhost:3000",
    credentials: true 
}));
app.use(cookieParser());
app.use(express.json({limit:"5mb"}))
app.use(express.urlencoded({extended:true}))

app.use("/api/auth/",authRoutes)
app.use("/api/user/",userRoutes)
app.use("/api/todo/",todoRoutes)
app.use("/api/notif/",notifRoutes)

app.listen(process.env.PORT,()=>{
    dbconnect()
    console.log("server power lv over 9000!");
})

