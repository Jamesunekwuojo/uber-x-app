import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.DBURL);
        console.log("MongoDB connected sucessfully");
    } catch (error) {
        console.log(error);
     
    }
}

connectDB();


