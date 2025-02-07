import Todo from "../models/todo.model.js"
import User from "../models/user.model.js"
import Notif from "../models/notif.model.js"
import { v2 as cloudinary } from "cloudinary";

export const getTodo = async(req,res)=>{
    const {status} = req.params
    const filter = {user:req.user._id}
    
    filter.status = status
    const todos = await Todo.find(filter)

    res.status(200).json(todos)
} 

export const getTodoCount = async (req, res) => {
    const high = await Todo.countDocuments({ user: req.user._id, priority: "high", status: "pending" });
    const normal = await Todo.countDocuments({ user: req.user._id, priority: "normal", status: "pending" });

    res.status(200).json({ high, normal});
};

export const create = async(req,res)=>{
    const {text,title,priority,status} = req.body
    let {img} = req.body
    const user = await User.findById(req.user._id)
    
    if(!user) return res.status(400).json({error: "user not found"})
    if(!title) return res.status(400).json({error: "must have title"}) 
    if(await Todo.findOne({title})) return res.status(400).json({ error: "Title already taken" });
    
    if(img){
        const uploadresponse = await cloudinary.uploader.upload(img)
        img = uploadresponse.secure_url
    }

    const newtodo = new Todo({
        user:req.user._id,
        title,
        text,
        img,
        priority:priority||"normal",
        status:status||"pending"
    })

    await Notif.create({
        user: req.user._id,
        todo: newtodo._id,
        message: `Task: ${title} is pending with ${priority} priority`
    });

    await newtodo.save()
    res.status(200).json(newtodo)
} 

export const edit = async(req,res)=>{
    const {newtext,newtitle,newpriority,newstatus} = req.body
    let {img} = req.body
    const user = await User.findById(req.user._id)
    const todo = await Todo.findById(req.params.id)
    
    if(!user) return res.status(400).json({error: "user not found"})
    if(!todo) return res.status(400).json({error: "todo not found"})
    if(newtitle){
        if(await Todo.findOne({title:newtitle})) return res.status(400).json({ error: "Title already taken" });
        todo.title = newtitle
    }
    if(newtext) todo.text = newtext
    if(newpriority) todo.priority = newpriority
    if(newstatus) {
        todo.status = newstatus
        if (newstatus==="completed"){
            await Notif.create({
                user: req.user._id,
                todo: todo._id,
                message: `You completed the task: ${todo.title} on ${todo.updatedAt.toLocaleString()}`
            });
        }
    }

    if (img) {
        if (todo.img) await cloudinary.uploader.destroy(todo.img.split("/").pop().split(".")[0]);
        const uploadRes = await cloudinary.uploader.upload(img);
        todo.img = uploadRes.secure_url;
    }


    await todo.save()
    res.status(200).json(todo)
} 

export const deleteTodo = async(req,res)=>{
    const todo = await Todo.findById(req.params.id)
    
    if(!todo) return res.status(400).json({error: "post not found"})
    if(todo.user.toString()!==req.user._id.toString()) return res.status(400).json({error: "you are not authorized to delete this post"})

    if(todo.img){
        const imgid = todo.img.split("/").pop().split(".")[0]
        await v2.uploader.destroy(imgid);
    }

    await Todo.findByIdAndDelete(req.params.id)
    res.status(200).json({message:"todo deleted successfully"});
}

