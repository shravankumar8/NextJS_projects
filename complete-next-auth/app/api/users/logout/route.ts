import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const response = NextResponse.json({
      message: "Logout succesfull",
      succes: true,
    });
    response.cookies.delete("token");
    return response;
  } catch (error: any) {
    console.log("error", error);
    NextResponse.json({ message: "error incurred", error });
  }
}
