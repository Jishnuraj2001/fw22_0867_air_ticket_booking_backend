const express = require("express");
const flightRouter = express.Router();

const { Flightmodel } = require("../models/flight.model");
const { authenticator } = require("../middlewares/authenticator.middleware");


flightRouter.get("/flights",async(req,res)=>{
    try {
        let alldata=await Flightmodel.find();
        if(alldata.length!=0){
            res.status(200).json({"msg":"all flight data is here","data":alldata});
        }else{
            res.status(404).json({"msg":"there is no Data present"});
        }
    } catch (error) {
        console.log(error.message);
        res.status(404).json({"msg":error.message});
    }
})

flightRouter.get("/flights/:id",async(req,res)=>{
    const id=req.params.id;
    try {
        let alldata=await Flightmodel.findOne({_id:id});
        if(alldata){
            res.status(200).json({"msg":`flight with id : ${id} is `,"data":alldata});
        }else{
            res.status(404).json({"msg":"there is no Data present"});
        }
    } catch (error) {
        console.log(error.message);
        res.status(404).json({"msg":error.message});
    }
})

flightRouter.post("/flights",authenticator,async(req,res)=>{
    const obj=req.body;
    console.log(obj);
    try {
        const flight=new Flightmodel(obj);
        await flight.save();
        res.status(201).json({"msg":"new flight created successfully"});
    } catch (error) {
        console.log(error.message);
        res.status(404).json({"msg":error.message});
    }
})


flightRouter.patch("/flights/:id",authenticator,async(req,res)=>{
    const updateObj=req.body;
    const id=req.params.id;
    try {
        const flight=await Flightmodel.findOne({_id:id});
        if(flight){
            if(flight.userID==req.body.userID){
                await Flightmodel.findByIdAndUpdate({_id:id},updateObj);
                res.status(204).json({"msg":`flight data with id : ${id} is updated successfully`});
            }else{
                res.status(404).json({"msg":"you are not authorized to update"});
            }
        }else{
            res.status(404).json({"msg":"unable to find the particular flight data"});
        }
    } catch (error) {
        console.log(error.message);
        res.status(404).json({"msg":error.message});
    }
})

flightRouter.delete("/flights/:id",authenticator,async(req,res)=>{
    const id=req.params.id;
    try {
        const flight=await Flightmodel.findOne({_id:id});
        if(flight){
            if(flight.userID==req.body.userID){
                await Flightmodel.findByIdAndDelete({_id:id});
                res.status(202).json({"msg":`flight data with id : ${id} is deleted successfully`});
            }else{
                res.status(404).json({"msg":"you are not authorized to delete"});
            }
        }else{
            res.status(404).json({"msg":"unable to find the particular flight data"});
        }
    } catch (error) {
        console.log(error.message);
        res.status(404).json({"msg":error.message});
    }
})


module.exports={
    flightRouter
}