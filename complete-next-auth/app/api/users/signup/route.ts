import { connection } from "@/dbConf/dbconfig";
import {User} from "@/models/userModel"
import { NextRequest,NextResponse } from "next/server";

connection()
export async function POST(req:NextRequest){
try {
    const body= await req.json()
const {username,email,password}=body    

// validation 
console.log(body)
const user = await User.create({
  username,
  email,
  password,
});


  return NextResponse.json(
    { message: "User created successfully" },
    { status: 201 }
  );
    
} catch (error:any) {
    console.log(error)
    return NextResponse.json(
      { error: "User creation failed",message:error },
      
    );
}




}



export async function GET(request: Request) {
  try {
    // Extract data from the request body
    const body = await request.json();

    // Perform your user signup logic here
    // For example, you might create a new user in your database

    // Return a success response
    return NextResponse.json(
      { message: "User created successfully" },
      { status: 201 }
    );
  } catch (error) {
    // Handle errors and return an appropriate response
    return NextResponse.json(
      { error: "User creation failed" },
      { status: 500 }
    );
  }
}
