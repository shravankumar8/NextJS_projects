// this is backend
import type { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";
import connectDB from "../db/connect";
import modelmaker from "../db/models";
conat Admin=[]
const secrect = "provenworks";
type Data = {
  token?: string;
  message?: string;
};
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const Admin =await modelmaker().Admin;
  await connectDB();
  const email = req.body.email;
  const password = req.body.password;
  const user = await Admin.findOne({ email: email });
  if (user) {
    return res.status(401).json({ message: "user already exist" });
  } else {
    const obj = { email: email, password: password };
    const newAdmin = new Admin(obj);
    newAdmin.save();
    const token = jwt.sign({ email }, secrect, { expiresIn: "1h" });
    return res
      .status(200)
      .json({ token: token, message: "user saved succesfully" });
  }
}
