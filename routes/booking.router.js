const express=require("express");
const bookingRouter=express.Router();

const {Bookingmodel}=require("../models/booking.model");
const {authenticator}=require("../middlewares/authenticator.middleware");
const { Flightmodel } = require("../models/flight.model");



bookingRouter.post("/booking",authenticator,async(req,res)=>{
    const{user,flight}=req.body;
    try {
        const booking=new Bookingmodel({user,flight});
        await booking.save();
        res.status(201).json({"msg":"booking successful."});
    } catch (error) {
        console.log(error.message);
        res.status(404).json({"msg":error.message});
    }
})

bookingRouter.get("/dashboard",authenticator,async(req,res)=>{
    const user=req.body.user;
    try {
        const data=await Bookingmodel.find({user:user});
        if(data.length!=0){
            res.status(200).json({"msg":`bookings of user with id ${user}`,"data":data});
        }else{
            res.status(404).json({"msg":"not able to find any data"});
        }
    } catch (error) {
        console.log(error.message);
        res.status(404).json({"msg":error.message});
    }
})


module.exports={
    bookingRouter
}