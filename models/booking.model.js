const { ObjectId } = require("bson");
const mongoose=require("mongoose");

const bookingSchema=mongoose.Schema({
    user : { type: ObjectId, ref: 'user' },
    flight : { type: ObjectId, ref: 'flight' }
})

const Bookingmodel=mongoose.model("booking",bookingSchema);

module.exports={
    Bookingmodel
}