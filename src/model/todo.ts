import mongoose from "mongoose"; 
const todoSchema = new mongoose.Schema({
    task:{
        type:String,
        required:true
    },
    aigenerated_description:{
        type:String,
        required:true
    },
    user:{
        type:String,
        required:true
    }
})
export const Todo = mongoose.models.Aitodo || mongoose.model('Aitodo',todoSchema)