import nodemailer from "nodemailer";

export const sendVerifyMail = async (email, id) => {
    try {
      const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        requireTLS: true,
        auth: {
          user: "musmanzafar153@gmail.com",
          pass: "odyymnjhvgpdijlv",
        },
      });
  
      const mailOption = {
        from: "musmanzafar153@gmail.com",
        to: email,
        subject: "Verification Email", // Subject line
        text: "Thank you for registering with us! To complete your registration and unlock full access to our platform, please verify your email address by clicking the link below:", // plain text body
      };
      transporter.sendMail(mailOption, function (err, info) {
        if (err) {
          console.log(`email has not sent`);
        } else {
          console.log(`email sent Successfully`);
        }
      });
    } catch (error) {
      console.log(error);
    }
  };