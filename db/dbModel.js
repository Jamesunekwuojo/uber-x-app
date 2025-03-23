import mongoose from "mongoose";


const requestSchema = new mongoose.Schema({
    requestTime:{type:Date},

    location: {
        coordinates: [Number],
        adress: {type:String}
    },

    civilianId: {type:String},
    copId: {type:String},
    status: {type:String}
})

const Request = mongoose.model("Request", requestSchema);

export default Request;