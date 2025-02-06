import express from "express";
import dotenv from 'dotenv'
import cookieParser from "cookie-parser";
import { v2 } from "cloudinary";

import { dbconnect } from "./db/db.js";

dotenv.config()
const app = express()

app.use(express.json({limit:"5mb"}))
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())

app.listen(process.env.PORT,()=>{
    dbconnect()
    console.log("server power lv over 9000!");
})

