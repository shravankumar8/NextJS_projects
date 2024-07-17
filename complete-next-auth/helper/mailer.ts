import { User } from "@/models/userModel";
import nodemailer from "nodemailer";
import bcryptjs from "bcryptjs";
export const sendEmail = async ({ email, emailType, userId }: any) => {
  try {
    const hashedToken = await bcryptjs.hash(userId.toString(), 10);

    if ((emailType = "VERIFY")) {
      await User.findByIdAndUpdate(userId, {
        verifyToken: hashedToken,
        verifyTokenExpiry: Date.now() + 3600000,
      });
    } else if ((emailType = "RESET")) {
      await User.findByIdAndUpdate(userId, {
        forgotPasswordToken: hashedToken,
        forgotPasswordExpiry: Date.now() + 3600000,
      });
    }
    // TODO create a configure mail for usage
    const transport = nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      auth: {
        user: "grover.nikolaus@ethereal.email",
        pass: "CzmhrpwuEK417VJuSB",
      },
    });
    let message = {
      from: process.env.DOMAIN,
      to: email,
      subject:
        emailType === "VERIFY" ? "Verify you email" : "Reset your password",
      text: "hello",
      html: `<p>
    <a href="${
      process.env.DOMAIN
    }/verifyemail?token=${hashedToken}">CLICK HERE</a>
    to ${
      emailType === "VERIFY " ? "Verify your email" : "Reset your password"
    } or paste the link below in your browser 
    <br>
    <a>
    ${process.env.DOMAIN}/verifyemail?token=${hashedToken}
    </a>
</p>
`,
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
