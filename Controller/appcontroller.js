const nodemailer = require("nodemailer");
const mailer = require("../Models/user");
const dotenv=require('dotenv')
dotenv.config()

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user:process.env.EMAIL,
    pass:process.env.EMAIL_PASSWORD
  }
});
console.log('check ******',Math.random());
function generateOTP() {
  return Math.floor(1000 + Math.random() * 9000).toString();
}
const signup = async (req, res) => {
  const { email } = req.body;

  console.log('124',email);
  const otp = generateOTP(); 
  const otpExpiration = new Date(Date.now() + 5 * 60 * 1000);

  console.log(
    otp,
    otpExpiration, 
    email 
  );
  const user = new mailer({
    email,
    otp,
    otpExpiration,
  });

  try {
    await user.save();

    // Send OTP via email
    const mailOptions = {
      from: process.env.EMAIL,
      to: email,
      subject: "Your OTP Code",
      text: `Your OTP code is shown below: ${otp}`,
    };

    console.log("mail optioons", mailOptions);
    const info=await transporter.sendMail(mailOptions);

    console.log("Email sent:", info.response);
    return res.status(200).json({ message: "OTP sent successfully", otp });
  } catch (err) {
    console.error("Error saving user:", err);
    return res.status(500).json({ error: "Error sending OTP email" });
  }
};
  
module.exports = { signup };
     