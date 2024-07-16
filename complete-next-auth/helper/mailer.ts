import { User } from "@/models/userModel";
import nodemailer from "nodemailer";
import bcryptjs from "bcryptjs";
export const sendEmail = async ({ email, emailType, userId }: any) => {
  try {
    const hashedToken = await bcryptjs.hash(userId.toString(), 10);

    if ((emailType = "VERIFY")) {
      await User.findByIdAndUpdate(userId, {
        verifyToken: hashedToken,
        VerifyTokenExpiry:Date.now()+3600000,
      });
    }

    // TODO create a configure mail for usage
const transporter = nodemailer.createTransport({
  host: "smtp.ethereal.email",
  port: 587,
  auth: {
    user: "adell35@ethereal.email",
    pass: "Rd4T3FQ2HKjArBe6x8",
  },
});
    let message = {
      from: process.env.DOMAIN,
      to: email,
      subject:
        emailType === "VERIFY" ? "Verify you email" : "Reaset your password",
      text: "hello",
      html: `<p>
    <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}">CLICK HERE</a>
    to ${emailType === "VERIFY " ? "Verify your email" : "Reset your password"} or paste the link below in your browser 
    <br>
    <a>
    ${process.env.DOMAIN}/verifyemail?token=${hashedToken}
    </a>
</p>
`
    };
    transport.sendMail(message, (err, info) => {
      if (err) {
        console.log("Error occured .", err.message);
        return process.exit(1);
      }
      console.log("Message Sent :%s", info.messageId);
    });
  } catch (error) {
    console.log(error);
  }
};
