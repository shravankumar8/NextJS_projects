import { connection } from "@/dbConf/dbconfig";
import { User } from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import Jwt from "jsonwebtoken";

connection()
export  async function  POST(req:NextRequest){
  try {
   const body=await req.json()
   const {email,password}=body
   const user=await User.findOne({email})
   if(!user){
   return  NextResponse.json({message:"user not found "},{status:500})
   }

 const validPassword=await bcryptjs.compare(password, user.password);
 if(!validPassword){
   
   return NextResponse.json({message:"User Credentials does not match"},{status:400})

 }

 const tokenData={
   id:user._id,
   email:user.email
 }
const JWTtoken =  Jwt.sign(tokenData, process.env.TOKEN_SECRET!,{expiresIn:"1d"});
const response=NextResponse.json({
   message:"login succes",
   success:true
})
response.cookies.set("token",JWTtoken,{
   httpOnly:true
})

return response








  } catch (error:any) {
   console.log(error)
   NextResponse.json({message:"error incurred ",error})
   
  }
  
  
   return NextResponse.json({"efe":"dewe"})
} 