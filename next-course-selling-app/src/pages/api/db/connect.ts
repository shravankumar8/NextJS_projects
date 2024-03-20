// db/connect.js
import mongoose from "mongoose";
let  flag:Boolean=false
const connectDB = async () => {
  if(!flag){
  try {
    await mongoose.connect(
      "mongodb+srv://kumashravan5:8Piz3bZ9jNpMkAJq@cluster0.t8zf1dw.mongodb.net/nextcource"
    );
    console.log("MongoDB connected");
    flag=true;
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }}else{
    return 
  }

};

export default connectDB;
