import mongoose from "mongoose"

export const dbconnect = async()=>{
    try {
        const conn = await mongoose.connect(process.env.MONGO)
        console.log(`mongo connected ${conn.connection.host}`);
        
    } catch (error) {
        console.error(`can't connect to server: ${error.message}`)
    }
}