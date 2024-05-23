import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from 'cors';

import userRoute from "./routes/user.js";
import carRoutes from "./routes/cars.js";

const app = express();

dotenv.config();

const port = process.env.PORT || 8000

app.use(express.json());
app.use(cors());

app.get("/",(req,res)=>{
    res.send("Database Connected")
})


//connect db

const connect = async () =>{
    try{
        await mongoose.connect(process.env.DB_URI);
        console.log("Database Connected successfully");
    }catch(error){
        throw error;
    }
}


app.use("/api/v1/user",userRoute)
app.use("/api/v1/cars", carRoutes);



app.listen(port,()=>{
    connect();
    console.log(`server is running at http://localhost:${port}`);
})