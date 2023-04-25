const express = require("express");
const userRouter = express.Router();
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");
require("dotenv").config();

const { Usermodel } = require("../models/user.model");

userRouter.post("/register",async(req,res)=>{
    const{name,email,password}=req.body;
    try {
        const checker=await Usermodel.findOne({email});
        if(checker){
            res.status(200).json({"msg":"Already exsisting email, Please enter another email."});
        }else{
            bcrypt.hash(password,7,async(err, hash)=>{
                if(hash){
                    const user =new Usermodel({name,email,password:hash});
                    await user.save();
                    res.status(201).json({"msg":"Registration successful"});
                }else{
                    res.status(404).json({"msg":err.message});
                }
            });
        }
    } catch (error) {
        console.log(error.message);
        res.status(404).json({"msg":error.message});
    }
})


userRouter.post("/login",async(req,res)=>{
    const {email,password}=req.body;
    try {
        const user=await Usermodel.findOne({email});
        if(user){
            bcrypt.compare(password,user.password,(err, result)=>{
                if(result == true){
                    const token = jwt.sign({ userID:user._id },process.env.key);
                    res.status(201).json({"msg":"Login successful","token":token});
                    // res.cookie("token",token,{httpOnly:true});
                }else{
                    res.status(404).json({"msg":"Wrong Credentials, Enter correct password"});
                }
            });
        }else{
            res.status(404).json({"msg":"Wrong Credentials"});
        }
    } catch (error) {
        console.log(error.message);
        res.status(404).json({"msg":error.message});
    }
})



module.exports={
    userRouter
}