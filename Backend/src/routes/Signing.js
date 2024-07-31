import express from 'express'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import connectDB from '../Utility/db.js'
import userDataValidation from '../Utility/UserDataValidation.js'
import { StudentData } from '../Utility/Schema&Model.js'

dotenv.config()
const signRouter=express.Router();


signRouter.post('/signup',async(req,res)=>{
    const userData=req.body;
    // console.log(success+" "+error.message)
    // console.log(userData.firstname+userData.lastname+userData.age+userData.email+userData.phoneNo);

    try {
        const {success,message}=userDataValidation(userData)
        if(!success){
            return res.json({
                msg:message
            })
        }

        connectDB();
        const student=await StudentData.create(userData);
        const userId=student._id.toString();        
        const token=jwt.sign({
            userId
        },process.env.SECRET_KEY)
        
        return res.json({
            token:token
        })

    } catch (error) {
        console.log(error)
        res.status(400);
        return res.json({
            msg:"Something went wrong! Please Try again!"
        })
    }

   
})

export default signRouter;