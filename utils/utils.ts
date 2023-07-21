import nodemailer from "nodemailer";



class Utils {
  
  // sending mail by nodemailer
  async sendVerifyMail (email:string) {
    try {
      const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        requireTLS: true,
        auth: {
          user: process.env.E_MAIL,
          pass: process.env.E_PASS,
        },
      });
  
      const mailOption = {
        from: process.env.E_MAIL,
        to: email,
        subject: "Verification Email", // Subject line
        text: "Thank you for registering with us! To complete your registration and unlock full access to our platform, please verify your email address by clicking the link below:", // plain text body
      };
      transporter.sendMail(mailOption, function (err:any, info:any) {
        if (err) {
          console.log(`Your Email Address Wrong`);
        } else {
          console.log(`email sent Successfully`);
        }
      });
    } catch (error) {
      console.log(error);
    }
  };


};


export const utilsInstance = new Utils();