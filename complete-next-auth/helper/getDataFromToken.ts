import { NextRequest, NextResponse } from "next/server";
import Jwt from "jsonwebtoken";
export async function getDataFromToken(req: NextRequest) {
  try {
    const token = req.cookies.get("token")?.value || "";
    const decoded: any = Jwt.verify(token,"provenworks");
    console.log(decoded)
    return decoded.id;
  } catch (error: any) {

    console.log("fewfwefe",error);
    throw new Error(error.message);
    NextResponse.json({ message: "error in me" });
  }
}
