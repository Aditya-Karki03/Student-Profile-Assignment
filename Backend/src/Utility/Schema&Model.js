import mongoose from "mongoose";
// import connectDB from "./db";


const studentSchema=new mongoose.Schema({
        firstname:{
            type:String,
            required:true,
            trim:true
        },
        lastname:{
            type:String,
            required:true,
            trim:true,
        },
        age:{
            type:String,
            required:true,
            trim:true
        },
        email:{
            type:String,
            required:true,
            trim:true,
            unique:true,
            lowercase:true
        },
        phoneNo:{
            type:String,
            required:true,
            trim:true,
            unique:true
        },
        password:{
            type:String,
            required:true,
            trim:true
        }
    })
export const StudentData=mongoose.model('StudentData',studentSchema)


