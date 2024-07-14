import nodemailer from "nodemailer";
export const sendEmail = async ({ email, emailType, userId }: any) => {
  try {
	// TODO create a configure mail for usage
    const transported = nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      secure: true,
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASS,
      },
    });
    let message = {
      from: process.env.DOMAIN,
      to: email,
      subject:
        emailType === "VERIFY" ? "Verify you email" : "Reaset your password",
      text: "hello",
      html: "<b>HELLO world</b>",
    };
    transported.sendMail(message, (err, info) => {
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
