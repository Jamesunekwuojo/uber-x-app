import mongoose from "mongoose";


const copsSchema = new mongoose.Schema({
    userId: {type: String, required: true, unique: true, trim: true},

    displayName: {type: String, required: true, trim: true},

    email: {type: String, required: true, unique: true},

    phone:{type: String, required: true},

    earnedRating: {type: Number, required: true},

    totalRatings: {type: Number, required: true},

    location: {
        type: {type: String, default: "Point", required: true},
        address: {type: String},
        coordinates: [Number]
    }


});

copsSchema.index({location: "2dsphere"});

const Cops = mongoose.model("Cops", copsSchema);
export default Cops;