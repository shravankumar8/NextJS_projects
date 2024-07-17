import { getDataFromToken } from "@/helper/getDataFromToken"
import { User } from "@/models/userModel"
import { NextRequest, NextResponse } from "next/server"

export async function POST(req:NextRequest){


try {
    
    const userId=await getDataFromToken(req)
    console.log("usserID",userId)
    const user=await User.findOne({_id:userId}).select("-password -verifyTokenExpiry")
    
    if(!user){
        
       return NextResponse.json({message:"user not found error try again me route"})



    }
return NextResponse.json({ message: "user found",data:user });

} catch (error) {
    console.log("dfefwefwefe",error)
return NextResponse.json({message:"error in me"})

}


}