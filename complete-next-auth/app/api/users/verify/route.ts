import { connection } from "@/dbConf/dbconfig";
import { User } from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
connection();
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const token = body.token;

    const user = await User.findOne({
      verifyToken: token,
      verifyTokenExpiry: { $gt: Date.now() },
    });

    if (!user) {
      console.log("unable to get user");
      return NextResponse.json(
        {
          error: "unable to verify user",
        },
        { status: 400 }
      );
    }
    user.isVerified = true;
    user.verifyToken = undefined;
    user.VerifyTokenExpiry = undefined;
    await user.save();

    return NextResponse.json({
      error: "succefully user authenticated",
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        error: "unable to verify user",
        message: error,
      },
      { status: 400 }
    );
  }
}
