import { connection } from "@/dbConf/dbconfig";
import { User } from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import { sendEmail } from "@/helper/mailer";
connection();
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { username, email, password } = body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { message: "User with the email already exist" },
        { status: 201 }
      );
    }

    const salt = await bcryptjs.genSalt(10);
    const hashPass = await bcryptjs.hash(password, salt);
    console.log(password, hashPass);
    const newUser = await User.create({
      username,
      email,
      password: hashPass,
    });
    const savedUser = await newUser.save();
    await sendEmail({ email, emailType: "VERIFY", userId: savedUser._id });

    console.log(body);
    return NextResponse.json({
      message: "User registered successfully",
      success: true,
      savedUser,
    });
  } catch (error: any) {
    console.log(error);
    return NextResponse.json({ error: "User creation failed", message: error });
  }
}


